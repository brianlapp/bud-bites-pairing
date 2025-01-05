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
  
  // Add optimization parameters
  url.searchParams.set('q', imageParams.quality);
  url.searchParams.set('fm', imageParams.format);
  url.searchParams.set('fit', imageParams.fit);
  url.searchParams.set('w', width.toString());
  
  return url.toString();
};

const getCachedImage = async (recipeName: string, recipeDescription: string) => {
  try {
    const { data, error } = await supabase
      .from('cached_recipe_images')
      .select('image_path')
      .eq('dish_name', recipeName)
      .eq('description', recipeDescription)
      .maybeSingle(); // Use maybeSingle instead of single to handle no results

    if (error) throw error;
    return data?.image_path;
  } catch (error) {
    console.error('Error fetching cached image:', error);
    return null;
  }
};

const generateAndCacheImage = async (recipeName: string, recipeDescription: string) => {
  try {
    // Use Supabase Edge Function to generate image instead of direct OpenAI call
    const { data: imageData, error } = await supabase.functions.invoke('generate-recipe-image', {
      body: { recipeName, recipeDescription }
    });

    if (error) throw error;
    if (!imageData?.imageUrl) throw new Error('No image URL returned');

    // Cache the generated image
    const { error: cacheError } = await supabase
      .from('cached_recipe_images')
      .insert([
        {
          dish_name: recipeName,
          description: recipeDescription,
          image_path: imageData.imageUrl
        }
      ]);

    if (cacheError) throw cacheError;
    return imageData.imageUrl;
  } catch (error) {
    console.error('Error generating and caching image:', error);
    return null;
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

    // 2. Check cache
    const cachedImageUrl = await getCachedImage(recipeName, recipeDescription);
    if (cachedImageUrl) {
      return getOptimizedImageUrl(cachedImageUrl, IMAGE_SIZES[size]);
    }

    // 3. Generate new image
    const generatedImageUrl = await generateAndCacheImage(recipeName, recipeDescription);
    if (generatedImageUrl) {
      return getOptimizedImageUrl(generatedImageUrl, IMAGE_SIZES[size]);
    }

    // 4. Fallback to placeholder
    return '/placeholder.svg';
  } catch (error) {
    console.error('Error in getMatchingImage:', error);
    return '/placeholder.svg';
  }
};