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
          content: `You are a creative culinary expert specializing in unique cannabis and food pairings. Your goal is to create unexpected yet delightful combinations that enhance both the dining experience and the strain's effects. Consider:

1. The strain's terpene profile and its impact on flavor
2. The strain's effects and how they complement the dining experience
3. Cultural fusion and creative twists on classic dishes
4. Seasonal ingredients and creative preparation methods
5. Texture combinations and temperature contrasts
6. Both sophisticated dishes and fun, casual options

For each pairing, provide:
- An innovative dish name that captures attention
- A detailed description highlighting unique elements
- A clear explanation of why this specific pairing works
- A concise but detailed recipe
- Creative cooking tips or serving suggestions

Format the response in JSON with this structure:
{
  "dishName": "Creative and engaging name",
  "description": "Vivid description of the dish",
  "pairingReason": "Detailed explanation of why this pairing works",
  "recipe": "Clear, step-by-step instructions",
  "cookingTips": "Unique preparation or serving suggestions"
}`
        },
        {
          role: "user",
          content: `Create an innovative and unexpected food pairing for the cannabis strain "${strain}". Consider both its flavor profile and effects to create something unique and memorable.`
        }
      ],
      temperature: 0.9,
      max_tokens: 1000
    });

    return response.choices[0]?.message?.content || "Unable to generate pairing suggestion.";
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return "Sorry, I couldn't generate a pairing suggestion at this time. Please try again later.";
  }
};