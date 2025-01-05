import { supabase } from "@/integrations/supabase/client";

export const getCachedImage = async (
  recipeName: string,
  recipeDescription: string
): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from('cached_recipe_images')
      .select('image_path')
      .match({ dish_name: recipeName, description: recipeDescription })
      .maybeSingle();

    if (error) {
      console.error('Error fetching cached image:', error);
      return null;
    }

    if (data) {
      const { data: { publicUrl } } = supabase
        .storage
        .from('recipe-images')
        .getPublicUrl(data.image_path);
      
      return publicUrl;
    }

    return null;
  } catch (error) {
    console.error('Error getting cached image:', error);
    return null;
  }
};

export const cacheNewImage = async (
  recipeName: string,
  recipeDescription: string,
  imageUrl: string
): Promise<string | null> => {
  try {
    const { data: proxyResponse, error: proxyError } = await supabase.functions.invoke('proxy-image', {
      body: { imageUrl }
    });

    if (proxyError || !proxyResponse?.base64) {
      console.error('Error proxying image:', proxyError || 'No base64 data received');
      throw new Error('Failed to proxy image');
    }

    // Convert base64 to blob
    const byteCharacters = atob(proxyResponse.base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const imageBlob = new Blob([byteArray], { type: 'image/png' });
    
    const imagePath = `${recipeName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.png`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('recipe-images')
      .upload(imagePath, imageBlob, {
        contentType: 'image/png',
        upsert: false
      });

    if (uploadError) {
      console.error('Error uploading to storage:', uploadError);
      return null;
    }

    // Save reference in cached_recipe_images table
    const { error: dbError } = await supabase
      .from('cached_recipe_images')
      .insert({
        dish_name: recipeName,
        description: recipeDescription,
        image_path: imagePath
      });

    if (dbError) {
      console.error('Error saving to database:', dbError);
      return null;
    }

    const { data: { publicUrl } } = supabase
      .storage
      .from('recipe-images')
      .getPublicUrl(imagePath);

    return publicUrl;
  } catch (error) {
    console.error('Error caching new image:', error);
    return null;
  }
};