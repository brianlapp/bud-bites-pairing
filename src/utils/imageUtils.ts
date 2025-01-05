import { supabase } from "@/integrations/supabase/client";

// Curated recipe images mapping for common recipes
const recipeImages: Record<string, string> = {
  "BBQ Pulled Pork Sliders": "https://images.unsplash.com/photo-1513185158878-8d8c2a2a3da3",
  "Lemon Herb Salmon": "https://images.unsplash.com/photo-1485921325833-c519f76c4927",
  "Chocolate Brownies": "https://images.unsplash.com/photo-1515037893149-de7f840978e2",
};

// Fallback images for different food categories
const fallbackImages = [
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836", // General food
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c", // Healthy food
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1", // Comfort food
  "https://images.unsplash.com/photo-1557499305-87bd9049ec2d", // Desserts
];

const imageParams = {
  quality: 'auto',
  format: 'auto',
  fit: 'crop',
};

export const IMAGE_SIZES = {
  small: 400,
  medium: 800,
  large: 1200,
};

const createImagePrompt = (recipeName: string, recipeDescription: string): string => {
  return `A professional food photography style image of ${recipeName}. ${recipeDescription}. Bright lighting, shallow depth of field, on a clean white plate, restaurant presentation style.`;
};

const getOptimizedImageUrl = (baseUrl: string, width: number): string => {
  try {
    const url = new URL(baseUrl);
    url.searchParams.set('q', imageParams.quality);
    url.searchParams.set('fm', imageParams.format);
    url.searchParams.set('fit', imageParams.fit);
    url.searchParams.set('w', width.toString());
    return url.toString();
  } catch (error) {
    console.error('Error optimizing image URL:', error);
    return baseUrl;
  }
};

const getFallbackImage = (): string => {
  const randomIndex = Math.floor(Math.random() * fallbackImages.length);
  return fallbackImages[randomIndex];
};

const checkCachedImage = async (dishName: string) => {
  try {
    const { data: cachedImage } = await supabase
      .from('cached_recipe_images')
      .select('image_path')
      .eq('dish_name', dishName)
      .maybeSingle();

    if (cachedImage?.image_path) {
      const { data: imageUrl } = supabase.storage
        .from('recipe-images')
        .getPublicUrl(cachedImage.image_path);
      
      return imageUrl.publicUrl;
    }
    return null;
  } catch (error) {
    console.error('Error checking cached image:', error);
    return null;
  }
};

const generateAndCacheImage = async (
  recipeName: string,
  recipeDescription: string
): Promise<string> => {
  try {
    // Generate image using edge function
    const { data: imageData, error } = await supabase.functions.invoke('generate-recipe-image', {
      body: { recipeName, recipeDescription }
    });

    if (error || !imageData?.imageUrl) {
      console.error('Failed to generate image:', error);
      return getFallbackImage();
    }

    // Download the generated image
    const imageResponse = await fetch(imageData.imageUrl);
    if (!imageResponse.ok) {
      console.error('Failed to download generated image');
      return getFallbackImage();
    }

    const imageBlob = await imageResponse.blob();
    const filename = `${crypto.randomUUID()}.png`;

    // Upload to Supabase Storage with proper authentication
    const { error: uploadError } = await supabase.storage
      .from('recipe-images')
      .upload(filename, imageBlob, {
        contentType: 'image/png',
        cacheControl: '31536000',
      });

    if (uploadError) {
      console.error('Failed to upload image:', uploadError);
      return getFallbackImage();
    }

    // Get the public URL
    const { data: urlData } = supabase.storage
      .from('recipe-images')
      .getPublicUrl(filename);

    // Cache the image metadata
    const { error: cacheError } = await supabase
      .from('cached_recipe_images')
      .insert({
        dish_name: recipeName,
        description: recipeDescription,
        image_path: filename,
      });

    if (cacheError) {
      console.error('Failed to cache image metadata:', cacheError);
    }

    return urlData.publicUrl;
  } catch (error) {
    console.error('Error generating and caching image:', error);
    return getFallbackImage();
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
    const cachedImageUrl = await checkCachedImage(recipeName);
    if (cachedImageUrl) {
      return getOptimizedImageUrl(cachedImageUrl, IMAGE_SIZES[size]);
    }

    // 3. Generate and cache new image
    const newImageUrl = await generateAndCacheImage(recipeName, recipeDescription);
    return getOptimizedImageUrl(newImageUrl, IMAGE_SIZES[size]);
  } catch (error) {
    console.error('Error fetching recipe image:', error);
    return getOptimizedImageUrl(getFallbackImage(), IMAGE_SIZES[size]);
  }
};