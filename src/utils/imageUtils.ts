import { supabase } from "@/integrations/supabase/client";

// Curated recipe images mapping
const recipeImages: Record<string, string> = {
  "BBQ Pulled Pork Sliders": "https://images.unsplash.com/photo-1513185158878-8d8c2a2a3da3",
  "Lemon Herb Salmon": "https://images.unsplash.com/photo-1485921325833-c519f76c4927",
  "Chocolate Brownies": "https://images.unsplash.com/photo-1515037893149-de7f840978e2",
  // Add more mappings as needed
};

// Image quality and format parameters
const imageParams = {
  quality: 'auto',
  format: 'auto',
  fit: 'crop',
};

// Responsive image sizes
const imageSizes = {
  small: 400,
  medium: 800,
  large: 1200,
};

const createImagePrompt = (recipeName: string, recipeDescription: string): string => {
  return `A professional food photography style image of ${recipeName}. ${recipeDescription}. Bright lighting, shallow depth of field, on a clean white plate, restaurant presentation style.`;
};

const getOptimizedImageUrl = (baseUrl: string, width: number): string => {
  const url = new URL(baseUrl);
  
  // Add optimization parameters
  url.searchParams.set('q', imageParams.quality);
  url.searchParams.set('fm', imageParams.format);
  url.searchParams.set('fit', imageParams.fit);
  url.searchParams.set('w', width.toString());
  
  return url.toString();
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

    // 2. Use AI generation as fallback
    const { data: imageData, error } = await supabase.functions.invoke('generate-recipe-image', {
      body: { recipeName, recipeDescription }
    });

    if (!error && imageData?.imageUrl) {
      return getOptimizedImageUrl(imageData.imageUrl, imageSizes[size]);
    }

    // 3. Final fallback: default placeholder
    return '/placeholder.svg';
  } catch (error) {
    console.error('Error fetching recipe image:', error);
    return '/placeholder.svg';
  }
};

// Export sizes for use in components
export const IMAGE_SIZES = imageSizes;