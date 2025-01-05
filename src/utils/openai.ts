import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

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
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4",
      temperature: 0.7,
      max_tokens: 1000,
    });

    return completion.choices[0].message.content || "";
  } catch (error) {
    console.error("Error generating pairing:", error);
    throw error;
  }
};