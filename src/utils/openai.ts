import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const generateMealPairing = async (strain: string): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a culinary expert specializing in cannabis and food pairings. Your responses should be concise (max 2-3 sentences) and focus on suggesting specific dishes or flavor combinations that complement the strain's terpene profile and effects."
        },
        {
          role: "user",
          content: `Suggest a meal pairing for the cannabis strain "${strain}". Consider the strain's typical flavor profile and effects. Keep the response concise and specific.`
        }
      ],
      temperature: 0.7,
      max_tokens: 150
    });

    return response.choices[0]?.message?.content || "Unable to generate pairing suggestion.";
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return "Sorry, I couldn't generate a pairing suggestion at this time. Please try again later.";
  }
}