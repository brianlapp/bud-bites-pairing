export const getStrainType = (strainName: string): "sativa" | "indica" | "hybrid" => {
  const lowerName = strainName.toLowerCase();
  if (lowerName.includes('indica')) return 'indica';
  if (lowerName.includes('sativa')) return 'sativa';
  return 'hybrid';
};

export const getStrainColor = (strainType: "sativa" | "indica" | "hybrid"): string => {
  switch (strainType) {
    case 'indica':
      return 'text-purple-500';
    case 'sativa':
      return 'text-green-500';
    default:
      return 'text-sage-500';
  }
};

export const cleanAndParseJSON = (jsonString: string): any => {
  try {
    // First attempt: direct parse
    try {
      return JSON.parse(jsonString);
    } catch (e) {
      // If direct parse fails, try cleaning the string
      const cleaned = jsonString
        .replace(/```json\n|\n```/g, '') // Remove markdown code blocks
        .replace(/\\n/g, ' ') // Replace newlines with spaces
        .replace(/\\"/g, '"') // Replace escaped quotes
        .trim(); // Remove whitespace

      // Try parsing the cleaned string
      return JSON.parse(cleaned);
    }
  } catch (error) {
    console.error('Error parsing pairing data:', error);
    // Return a fallback object with required properties
    return {
      dishName: 'Error loading recipe',
      description: 'There was an error loading this recipe. Please try again later.',
      recipe: '',
      cookingTips: [],
      imageUrl: null
    };
  }
};