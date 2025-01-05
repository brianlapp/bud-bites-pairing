import { supabase } from "@/integrations/supabase/client";

export const IMAGE_SIZES = {
  small: 640,
  medium: 1024,
  large: 1920
};

const generateAndCacheImage = async (dishName: string, description: string): Promise<string> => {
  try {
    const prompt = `A professional food photography style image of ${dishName}. ${description}. Bright lighting, shallow depth of field, on a clean white plate, restaurant presentation style.`;

    // Generate image using our Edge Function
    const { data, error } = await supabase.functions.invoke('generate-recipe-image', {
      body: { prompt, dishName, description }
    });

    if (error) throw error;
    if (!data?.imageUrl) throw new Error('No image URL returned');

    return data.imageUrl;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
};

export const getMatchingImage = async (
  dishName: string,
  description: string
): Promise<string> => {
  try {
    // Try to get cached image
    const { data: cachedImage, error: cacheError } = await supabase
      .from('cached_recipe_images')
      .select('image_path')
      .eq('dish_name', dishName)
      .eq('description', description)
      .maybeSingle();

    if (cacheError) {
      console.error('Error fetching cached image:', cacheError);
      throw cacheError;
    }

    // If cached image exists, return it
    if (cachedImage?.image_path) {
      return cachedImage.image_path;
    }

    // Generate and cache new image
    return await generateAndCacheImage(dishName, description);
  } catch (error) {
    console.error('Error in getMatchingImage:', error);
    return '/placeholder.svg'; // Fallback to placeholder if everything fails
  }
};