import { supabase } from "@/integrations/supabase/client";
import { RECIPE_IMAGES, IMAGE_SIZES } from './constants';
import { ImageSize } from './types';
import { getOptimizedImageUrl, createImagePrompt } from './urlUtils';
import { getCachedImage, cacheNewImage } from './cacheUtils';

export const getMatchingImage = async (
  recipeName: string,
  recipeDescription: string,
  size: ImageSize = 'medium'
): Promise<string> => {
  try {
    // 1. Check curated mapping
    if (RECIPE_IMAGES[recipeName]) {
      return getOptimizedImageUrl(RECIPE_IMAGES[recipeName], IMAGE_SIZES[size]);
    }

    // 2. Check cached images
    const cachedImageUrl = await getCachedImage(recipeName, recipeDescription);
    if (cachedImageUrl) {
      return getOptimizedImageUrl(cachedImageUrl, IMAGE_SIZES[size]);
    }

    // 3. Generate new image with DALL-E
    const { data: imageData, error } = await supabase.functions.invoke('generate-recipe-image', {
      body: { recipeName, recipeDescription }
    });

    if (!error && imageData?.imageUrl) {
      const cachedUrl = await cacheNewImage(recipeName, recipeDescription, imageData.imageUrl);
      if (cachedUrl) {
        return getOptimizedImageUrl(cachedUrl, IMAGE_SIZES[size]);
      }
      
      // If caching fails, return the original DALL-E URL
      return getOptimizedImageUrl(imageData.imageUrl, IMAGE_SIZES[size]);
    }

    // 4. Final fallback: default placeholder
    return '/placeholder.svg';
  } catch (error) {
    console.error('Error fetching recipe image:', error);
    return '/placeholder.svg';
  }
};

// Re-export constants for backward compatibility
export { IMAGE_SIZES };