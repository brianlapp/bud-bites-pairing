import { supabase } from "@/integrations/supabase/client";

export async function getMatchingImage(dishName: string, description: string): Promise<string> {
  try {
    // Check if we have a cached image
    const { data: cachedImage, error } = await supabase
      .from('cached_recipe_images')
      .select('image_path')
      .eq('dish_name', dishName)
      .eq('description', description)
      .maybeSingle();

    if (error) {
      console.error('Error fetching cached image:', error);
      return '/placeholder.svg';
    }

    if (cachedImage?.image_path) {
      console.log('Using cached image:', cachedImage.image_path);
      return cachedImage.image_path;
    }

    // If no cached image, generate a new one
    const prompt = `A professional, appetizing food photography style image of ${dishName}. ${description}. The image should be well-lit, with a clean background, and focus on the dish's presentation.`;
    
    // Generate image using our Edge Function
    const { data, error: genError } = await supabase.functions.invoke('generate-recipe-image', {
      body: { prompt, dishName, description }
    });

    if (genError) {
      console.error('Error generating image:', genError);
      return '/placeholder.svg';
    }
    
    if (!data?.imageUrl) {
      console.error('No image URL returned from generation');
      return '/placeholder.svg';
    }

    return data.imageUrl;
  } catch (error) {
    console.error('Error getting matching image:', error);
    return '/placeholder.svg';
  }
}