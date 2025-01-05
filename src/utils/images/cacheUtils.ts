import { supabase } from "@/integrations/supabase/client";

export const getCachedImage = async (recipeName: string, recipeDescription: string): Promise<string | null> => {
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

export const cacheNewImage = async (
  recipeName: string,
  recipeDescription: string,
  imageUrl: string
): Promise<string | null> => {
  try {
    const imagePath = `${recipeName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.png`;
    
    // Download and upload to Supabase Storage
    const imageResponse = await fetch(imageUrl);
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

      return publicUrl;
    }

    return null;
  } catch (error) {
    console.error('Error caching new image:', error);
    return null;
  }
};