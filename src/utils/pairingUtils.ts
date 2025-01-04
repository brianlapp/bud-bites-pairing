export const cleanAndParseJSON = (jsonString: string) => {
  try {
    const cleaned = jsonString.replace(/```json\n|\n```/g, '');
    return JSON.parse(cleaned);
  } catch (error) {
    console.error('Error parsing pairing data:', error);
    return null;
  }
};