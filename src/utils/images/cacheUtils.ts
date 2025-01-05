import { supabase } from "@/integrations/supabase/client";

export const getCachedImage = async (recipeName: string, recipeDescription: string): Promise<string | null> => {
  try {
    const { data: cachedImage, error } = await supabase
      .from('cached_recipe_images')
      .select('image_path')
      .match({ dish_name: recipeName, description: recipeDescription })
      .maybeSingle();

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
    // Instead of fetching directly, use the proxy edge function
    const proxyResponse = await fetch('/api/proxy-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrl }),
    });

    if (!proxyResponse.ok) {
      throw new Error('Failed to proxy image');
    }

    const imageBlob = await proxyResponse.blob();
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