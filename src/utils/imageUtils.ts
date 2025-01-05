import { supabase } from "@/integrations/supabase/client";

const generateAndCacheImage = async (dishName: string, description: string): Promise<string> => {
  try {
    const prompt = `A professional food photography style image of ${dishName}. ${description}. Bright lighting, shallow depth of field, on a clean white plate, restaurant presentation style.`;

    // Generate image using our Edge Function
    const { data, error } = await supabase.functions.invoke('generate-recipe-image', {
      body: { prompt }
    });

    if (error) throw error;
    if (!data?.imageUrl) throw new Error('No image URL returned');

    // Cache the image URL
    const { error: cacheError } = await supabase
      .from('cached_recipe_images')
      .insert({
        dish_name: dishName,
        description: description,
        image_path: data.imageUrl
      });

    if (cacheError) {
      console.error('Error caching image:', cacheError);
    }

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