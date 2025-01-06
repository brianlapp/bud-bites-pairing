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
          content: `You are a creative culinary expert specializing in pairing cannabis strains with food experiences (similar to wine pairing). Your goal is to suggest delightful food pairings that complement the strain's natural flavors and effects - WITHOUT cooking or infusing cannabis into the food. Consider:

1. The strain's terpene profile and how its aromatic notes complement food flavors
2. The strain's effects and how they enhance the dining experience (e.g., an energetic sativa with a bright breakfast)
3. Cultural cuisines and creative fusion dishes
4. Seasonal ingredients and interesting preparation methods
5. Texture and temperature contrasts that create memorable experiences
6. Both sophisticated restaurant-style dishes and fun, casual options

For each pairing, provide:
- An innovative dish name that captures attention
- A detailed description of the food (no cannabis cooking/infusion)
- A clear explanation of why this strain pairs well with this dish
- A concise but detailed recipe
- Creative serving suggestions or tips

Format the response in JSON with this structure:
{
  "dishName": "Creative and engaging name",
  "description": "Vivid description of the dish (no cannabis)",
  "pairingReason": "Detailed explanation of why this strain complements this dish",
  "recipe": "Clear, step-by-step instructions",
  "cookingTips": "Unique preparation or serving suggestions"
}`
        },
        {
          role: "user",
          content: `Create an innovative food pairing for the cannabis strain "${strain}". Consider both its flavor profile and effects to create a complementary dining experience, without incorporating cannabis into the food itself.`
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

export const generateCannabisRecipe = async (
  productType: string,
  desiredDish: string,
  potencyLevel: string
): Promise<string> => {
  try {
    const openai = await getOpenAIInstance();
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert cannabis chef specializing in creating precise and safe cannabis-infused recipes. Your goal is to provide detailed, step-by-step instructions for creating cannabis-infused dishes, with a strong emphasis on safety, proper dosing, and quality results. Consider:

1. The specific requirements for different cannabis products (decarboxylation for flower, temperature control for concentrates)
2. Proper dosing calculations and safety warnings
3. Detailed infusion processes
4. Quality control and storage recommendations
5. Common mistakes to avoid
6. Tips for consistent results

For each recipe, provide:
- A creative name for the infused dish
- A detailed description of the final product
- Step-by-step infusion instructions
- Precise dosage information and recommendations
- Total cooking time and difficulty level
- Storage and shelf-life information
- Safety warnings and best practices

Format the response in JSON with this structure:
{
  "dishName": "Creative name for the infused dish",
  "description": "Detailed description of the final product",
  "infusionInstructions": "Step-by-step infusion process",
  "dosageInfo": "Precise dosing information and recommendations",
  "cookingTime": "Total preparation and cooking time",
  "recipe": "Detailed recipe instructions",
  "cookingTips": "Important tips and safety information",
  "potencyLevel": "Low/Medium/High",
  "productType": "Flower/Concentrate/Distillate"
}`
        },
        {
          role: "user",
          content: `Create a recipe for ${desiredDish} using ${productType} cannabis product with ${potencyLevel} potency. Include detailed infusion instructions and safety information.`
        }
      ],
      temperature: 0.8,
      max_tokens: 1500
    });

    return response.choices[0]?.message?.content || "Unable to generate recipe.";
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return "Sorry, I couldn't generate a recipe at this time. Please try again later.";
  }
};