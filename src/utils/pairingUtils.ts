export const cleanAndParseJSON = (jsonString: string) => {
  try {
    // First try parsing the string directly
    try {
      return JSON.parse(jsonString);
    } catch (directParseError) {
      // If direct parsing fails, try cleaning the string
      const cleaned = jsonString
        .replace(/```json\n|\n```/g, '')  // Remove markdown code blocks
        .trim();                          // Remove whitespace
      
      // Try parsing the cleaned string
      try {
        return JSON.parse(cleaned);
      } catch (cleanedParseError) {
        console.error('Error parsing cleaned JSON:', cleanedParseError);
        console.error('Original string:', jsonString);
        console.error('Cleaned string:', cleaned);
        return null;
      }
    }
  } catch (error) {
    console.error('Error in cleanAndParseJSON:', error);
    console.error('Input string:', jsonString);
    return null;
  }
};