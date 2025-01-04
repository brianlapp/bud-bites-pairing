import OpenAI from 'openai';

let openai: OpenAI | null = null;

export const initializeOpenAI = (apiKey: string) => {
  openai = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true
  });
};

export const generateMealPairing = async (strain: string): Promise<string> => {
  if (!openai) {
    throw new Error('OpenAI not initialized. Please provide an API key.');
  }

  const prompt = `Suggest a meal pairing for the cannabis strain "${strain}". Consider the strain's flavor profile, effects, and potential complementary food experiences. Format the response as a concise paragraph.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: "You are a culinary expert specializing in cannabis and food pairings. Provide thoughtful, creative meal suggestions that complement cannabis strains."
      },
      {
        role: "user",
        content: prompt
      }
    ],
  });

  return response.choices[0]?.message?.content || "Unable to generate pairing suggestion.";
};