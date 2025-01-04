import { supabase } from "@/integrations/supabase/client";

// Curated recipe images mapping
const recipeImages: Record<string, string> = {
  "BBQ Pulled Pork Sliders": "https://images.unsplash.com/photo-1513185158878-8d8c2a2a3da3",
  "Lemon Herb Salmon": "https://images.unsplash.com/photo-1485921325833-c519f76c4927",
  "Chocolate Brownies": "https://images.unsplash.com/photo-1515037893149-de7f840978e2",
  // Add more mappings as needed
};

const createImagePrompt = (recipeName: string, recipeDescription: string): string => {
  return `A professional food photography style image of ${recipeName}. ${recipeDescription}. Bright lighting, shallow depth of field, on a clean white plate, restaurant presentation style.`;
};

export const getMatchingImage = async (
  recipeName: string,
  recipeDescription: string
): Promise<string> => {
  try {
    // 1. Check curated mapping
    if (recipeImages[recipeName]) {
      return recipeImages[recipeName];
    }

    // 2. Use AI generation as fallback
    const { data: imageData, error } = await supabase.functions.invoke('generate-recipe-image', {
      body: { recipeName, recipeDescription }
    });

    if (!error && imageData?.imageUrl) {
      return imageData.imageUrl;
    }

    // 3. Final fallback: default placeholder
    return '/placeholder.svg';
  } catch (error) {
    console.error('Error fetching recipe image:', error);
    return '/placeholder.svg';
  }
};