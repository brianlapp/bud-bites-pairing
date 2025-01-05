import { supabase } from "@/integrations/supabase/client";

// Curated recipe images mapping
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
export const imageSizes = {
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

const getCachedImage = async (recipeName: string, recipeDescription: string): Promise<string | null> => {
  try {
    const { data: cachedImage, error } = await supabase
      .from('cached_recipe_images')
      .select('image_path')
      .match({ dish_name: recipeName, description: recipeDescription })
      .single();

    if (error) {
      console.error('Error fetching cached image:', error);
      return null;
    }

    if (cachedImage) {
      const { data: { publicUrl } } = supabase
        .storage
        .from('recipe-images')
        .getPublicUrl(cachedImage.image_path);
      
      return publicUrl;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching cached image:', error);
    return null;
  }
};

export const getMatchingImage = async (
  recipeName: string,
  recipeDescription: string,
  size: keyof typeof imageSizes = 'medium'
): Promise<string> => {
  try {
    // 1. Check curated mapping
    if (recipeImages[recipeName]) {
      return getOptimizedImageUrl(recipeImages[recipeName], imageSizes[size]);
    }

    // 2. Check cached images
    const cachedImageUrl = await getCachedImage(recipeName, recipeDescription);
    if (cachedImageUrl) {
      return getOptimizedImageUrl(cachedImageUrl, imageSizes[size]);
    }

    // 3. Generate new image with DALL-E
    const { data: imageData, error } = await supabase.functions.invoke('generate-recipe-image', {
      body: { recipeName, recipeDescription }
    });

    if (!error && imageData?.imageUrl) {
      // Cache the new image
      const imagePath = `${recipeName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.png`;
      
      // Download the image and upload to Supabase Storage
      const imageResponse = await fetch(imageData.imageUrl);
      const imageBlob = await imageResponse.blob();
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('recipe-images')
        .upload(imagePath, imageBlob, {
          contentType: 'image/png',
          upsert: false
        });

      if (!uploadError) {
        // Save reference in cached_recipe_images table
        await supabase
          .from('cached_recipe_images')
          .insert({
            dish_name: recipeName,
            description: recipeDescription,
            image_path: imagePath
          });

        const { data: { publicUrl } } = supabase
          .storage
          .from('recipe-images')
          .getPublicUrl(imagePath);

        return getOptimizedImageUrl(publicUrl, imageSizes[size]);
      }

      // If caching fails, return the original DALL-E URL
      return getOptimizedImageUrl(imageData.imageUrl, imageSizes[size]);
    }

    // 4. Final fallback: default placeholder
    return '/placeholder.svg';
  } catch (error) {
    console.error('Error fetching recipe image:', error);
    return '/placeholder.svg';
  }
};

// Export sizes for use in components
export const IMAGE_SIZES = imageSizes;