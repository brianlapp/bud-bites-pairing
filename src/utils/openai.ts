import OpenAI from 'openai';
import { supabase } from "@/integrations/supabase/client";

const getOpenAIKey = async () => {
  const { data: { OPENAI_API_KEY } } = await supabase.functions.invoke('get-secret', {
    body: { name: 'OPENAI_API_KEY' }
  });
  return OPENAI_API_KEY;
};

let openaiInstance: OpenAI | null = null;

const getOpenAIInstance = async () => {
  if (!openaiInstance) {
    const apiKey = await getOpenAIKey();
    openaiInstance = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true
    });
  }
  return openaiInstance;
};

export const generateMealPairing = async (strain: string): Promise<string> => {
  try {
    const openai = await getOpenAIInstance();
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a culinary expert specializing in cannabis and food pairings. Create detailed meal pairings that include:
          1. A matching meal or snack with a brief recipe
          2. An explanation of why the pairing works (flavors and effects)
          3. Optional cooking tips
          Format the response in JSON with the following structure:
          {
            "dishName": "Name of the dish",
            "description": "Brief description of the dish",
            "pairingReason": "Why this pairing works with the strain",
            "recipe": "Brief recipe steps",
            "cookingTips": "Optional cooking tips or substitutions"
          }`
        },
        {
          role: "user",
          content: `Suggest a meal pairing for the cannabis strain "${strain}". Consider the strain's typical flavor profile and effects.`
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No content received from OpenAI");
    }

    // Validate JSON before returning
    try {
      JSON.parse(content);
      return content;
    } catch (parseError) {
      console.error("Invalid JSON received from OpenAI:", content);
      throw new Error("Invalid JSON format received from API");
    }
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error(`Failed to generate pairing: ${error.message}`);
  }
};