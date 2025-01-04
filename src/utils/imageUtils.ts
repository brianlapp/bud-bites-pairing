import { supabase } from "@/integrations/supabase/client";

// Curated recipe images mapping
const recipeImages: Record<string, string> = {
  "BBQ Pulled Pork Sliders": "https://images.unsplash.com/photo-1513185158878-8d8c2a2a3da3",
  "Lemon Herb Salmon": "https://images.unsplash.com/photo-1485921325833-c519f76c4927",
  "Chocolate Brownies": "https://images.unsplash.com/photo-1515037893149-de7f840978e2",
  // Add more mappings as needed
};

const createSearchQuery = (recipeName: string): string => {
  // Remove common words and create a focused search query
  const commonWords = ['with', 'and', 'the', 'a', 'an', 'in', 'on', 'at', 'to'];
  return recipeName
    .split(' ')
    .filter(word => !commonWords.includes(word.toLowerCase()))
    .join(' ') + ' food dish plated';
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

    // 2. Try Unsplash API
    const searchQuery = createSearchQuery(recipeName);
    const unsplashResponse = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(
        searchQuery
      )}&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID YOUR_UNSPLASH_ACCESS_KEY`
        }
      }
    );

    if (unsplashResponse.ok) {
      const data = await unsplashResponse.json();
      return data.urls.regular;
    }

    // 3. Fallback to AI generation
    const { data: imageData, error } = await supabase.functions.invoke('generate-recipe-image', {
      body: { recipeName, recipeDescription }
    });

    if (!error && imageData?.imageUrl) {
      return imageData.imageUrl;
    }

    // 4. Final fallback: default placeholder
    return '/placeholder.svg';
  } catch (error) {
    console.error('Error fetching recipe image:', error);
    return '/placeholder.svg';
  }
};