import { supabase } from "@/integrations/supabase/client";

// Curated recipe images mapping for common recipes
const recipeImages: Record<string, string> = {
  "BBQ Pulled Pork Sliders": "https://images.unsplash.com/photo-1513185158878-8d8c2a2a3da3",
  "Lemon Herb Salmon": "https://images.unsplash.com/photo-1485921325833-c519f76c4927",
  "Chocolate Brownies": "https://images.unsplash.com/photo-1515037893149-de7f840978e2",
};

// Image quality and format parameters
const imageParams = {
  quality: 'auto',
  format: 'auto',
  fit: 'crop',
};

// Responsive image sizes
export const IMAGE_SIZES = {
  small: 400,
  medium: 800,
  large: 1200,
};

const createImagePrompt = (recipeName: string, recipeDescription: string): string => {
  return `A professional food photography style image of ${recipeName}. ${recipeDescription}. Bright lighting, shallow depth of field, on a clean white plate, restaurant presentation style.`;
};

const getOptimizedImageUrl = (baseUrl: string, width: number): string => {
  const url = new URL(baseUrl);
  url.searchParams.set('q', imageParams.quality);
  url.searchParams.set('fm', imageParams.format);
  url.searchParams.set('fit', imageParams.fit);
  url.searchParams.set('w', width.toString());
  return url.toString();
};

const checkCachedImage = async (dishName: string, description: string) => {
  const { data: cachedImage } = await supabase
    .from('cached_recipe_images')
    .select('image_path')
    .eq('dish_name', dishName)
    .eq('description', description)
    .single();

  if (cachedImage) {
    const { data: imageUrl } = supabase.storage
      .from('recipe-images')
      .getPublicUrl(cachedImage.image_path);
    
    return imageUrl.publicUrl;
  }

  return null;
};

const generateAndCacheImage = async (
  recipeName: string,
  recipeDescription: string
): Promise<string> => {
  try {
    // Generate image using OpenAI
    const { data: imageData, error } = await supabase.functions.invoke('generate-recipe-image', {
      body: { recipeName, recipeDescription }
    });

    if (error || !imageData?.imageUrl) {
      throw new Error('Failed to generate image');
    }

    // Download the generated image
    const imageResponse = await fetch(imageData.imageUrl);
    const imageBlob = await imageResponse.blob();

    // Create a unique filename
    const filename = `${crypto.randomUUID()}.png`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('recipe-images')
      .upload(filename, imageBlob, {
        contentType: 'image/png',
        cacheControl: '31536000',
      });

    if (uploadError) {
      throw uploadError;
    }

    // Get the public URL
    const { data: urlData } = supabase.storage
      .from('recipe-images')
      .getPublicUrl(filename);

    // Save to cached_recipe_images table
    await supabase
      .from('cached_recipe_images')
      .insert({
        dish_name: recipeName,
        description: recipeDescription,
        image_path: filename,
      });

    return urlData.publicUrl;
  } catch (error) {
    console.error('Error generating and caching image:', error);
    return '/placeholder.svg';
  }
};

export const getMatchingImage = async (
  recipeName: string,
  recipeDescription: string,
  size: keyof typeof IMAGE_SIZES = 'medium'
): Promise<string> => {
  try {
    // 1. Check curated mapping
    if (recipeImages[recipeName]) {
      return getOptimizedImageUrl(recipeImages[recipeName], IMAGE_SIZES[size]);
    }

    // 2. Check cached images
    const cachedImageUrl = await checkCachedImage(recipeName, recipeDescription);
    if (cachedImageUrl) {
      return getOptimizedImageUrl(cachedImageUrl, IMAGE_SIZES[size]);
    }

    // 3. Generate and cache new image
    const newImageUrl = await generateAndCacheImage(recipeName, recipeDescription);
    return getOptimizedImageUrl(newImageUrl, IMAGE_SIZES[size]);
  } catch (error) {
    console.error('Error fetching recipe image:', error);
    return '/placeholder.svg';
  }
};