export const cleanAndParseJSON = (jsonString: string) => {
  try {
    // First try parsing directly in case it's already valid JSON
    try {
      return JSON.parse(jsonString);
    } catch {
      // If direct parsing fails, try cleaning the string
      const cleaned = jsonString
        .replace(/```json\n|\n```/g, '') // Remove markdown code blocks
        .trim();
      
      // Try parsing the cleaned string
      return JSON.parse(cleaned);
    }
  } catch (error) {
    console.error('Error parsing pairing data:', error);
    // Return a default structure instead of null
    return {
      dishName: "Error loading recipe",
      description: "There was an error loading this recipe. Please try again later.",
      pairingReason: "",
      recipe: "",
      cookingTips: ""
    };
  }
};