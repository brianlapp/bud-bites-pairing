import { supabase } from "@/integrations/supabase/client";

export const generateMealPairing = async (strain: string): Promise<string> => {
  const prompt = `Create a cannabis and food pairing for ${strain}. Return the response in this exact JSON format:
  {
    "dishName": "Name of the dish",
    "description": "A brief description of the dish and how it pairs with the strain",
    "recipe": "Step by step recipe instructions",
    "cookingTips": ["tip 1", "tip 2"],
    "pairingNotes": "Why this pairing works well"
  }`;

  try {
    const { data, error } = await supabase.functions.invoke('generate-meal-pairing', {
      body: { prompt }
    });

    if (error) throw error;
    return data.response || "";
  } catch (error) {
    console.error("Error generating pairing:", error);
    throw error;
  }
};