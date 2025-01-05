import { StrainType } from "@/types/strain";

export const getStrainType = (strainName: string): StrainType => {
  const lowerName = strainName.toLowerCase();
  if (lowerName.includes('indica')) return 'indica';
  if (lowerName.includes('sativa')) return 'sativa';
  return 'hybrid';
};

export const getStrainColor = (type: StrainType): string => {
  switch (type) {
    case 'indica':
      return 'text-purple-500';
    case 'sativa':
      return 'text-green-500';
    default:
      return 'text-blue-500';
  }
};

export const cleanAndParseJSON = (text: string) => {
  try {
    // First attempt: Try parsing as JSON directly
    return JSON.parse(text);
  } catch (error) {
    console.error('Error parsing pairing data:', error);
    
    // Second attempt: If it's a text response, create a structured object
    if (typeof text === 'string') {
      // Check if it contains common recipe elements
      const hasRecipe = text.toLowerCase().includes('recipe:') || 
                       text.toLowerCase().includes('ingredients:') ||
                       text.toLowerCase().includes('instructions:');
                       
      if (hasRecipe) {
        // Basic recipe structure
        return {
          dishName: text.split('\n')[0].replace('Recipe:', '').trim(),
          description: text.split('\n').slice(1, 3).join(' ').trim(),
          recipe: text.split('\n').slice(3).join('\n').trim(),
          cookingTips: [],
          pairingNotes: text.split('\n')[1].trim()
        };
      }
      
      // Fallback for simple text responses
      return {
        dishName: "Custom Pairing",
        description: text,
        recipe: "",
        cookingTips: [],
        pairingNotes: text
      };
    }
    
    // If all parsing attempts fail, throw the error
    throw error;
  }
};