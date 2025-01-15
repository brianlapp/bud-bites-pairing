/**
 * Represents the possible types of cannabis strains
 */
export type StrainType = "sativa" | "indica" | "hybrid";

/**
 * Determines the strain type based on the strain name
 * @param strainName - The name of the cannabis strain
 * @returns The determined strain type (sativa, indica, or hybrid)
 */
export const getStrainType = (strainName: string): StrainType => {
  const lowerName = strainName.toLowerCase();
  if (lowerName.includes('indica')) return 'indica';
  if (lowerName.includes('sativa')) return 'sativa';
  return 'hybrid';
};

/**
 * Maps strain types to their corresponding Tailwind text color classes
 */
const STRAIN_COLORS: Record<StrainType, string> = {
  indica: 'text-purple-500',
  sativa: 'text-green-500',
  hybrid: 'text-sage-500'
};

/**
 * Gets the color class for a given strain type
 * @param strainType - The type of strain
 * @returns The corresponding Tailwind color class
 */
export const getStrainColor = (strainType: StrainType): string => {
  return STRAIN_COLORS[strainType];
};

/**
 * Attempts to parse and clean JSON data from a string
 * @param jsonString - The JSON string to parse
 * @returns The parsed JSON object or a fallback object if parsing fails
 */
export const cleanAndParseJSON = (jsonString: string): any => {
  try {
    // First attempt: direct parse
    try {
      return JSON.parse(jsonString);
    } catch {
      // If direct parse fails, try cleaning the string
      const cleaned = jsonString
        .replace(/```json\n|\n```/g, '') // Remove markdown code blocks
        .replace(/\\n/g, ' ') // Replace newlines with spaces
        .replace(/\\"/g, '"') // Replace escaped quotes
        .trim(); // Remove whitespace

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