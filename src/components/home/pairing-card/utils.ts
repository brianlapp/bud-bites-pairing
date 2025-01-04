export const getStrainType = (strainName: string): 'sativa' | 'indica' | 'hybrid' => {
  const lowerName = strainName.toLowerCase();
  if (lowerName.includes('sativa')) return 'sativa';
  if (lowerName.includes('indica')) return 'indica';
  return 'hybrid';
};

export const getStrainColor = (type: 'sativa' | 'indica' | 'hybrid'): string => {
  switch (type) {
    case 'sativa':
      return 'text-coral-500';
    case 'indica':
      return 'text-indigo-500';
    case 'hybrid':
      return 'text-sage-500';
    default:
      return 'text-sage-500';
  }
};

export const cleanAndParseJSON = (jsonString: string) => {
  try {
    const cleaned = jsonString.replace(/```json\n|\n```/g, '');
    return JSON.parse(cleaned);
  } catch (error) {
    console.error('Error parsing pairing data:', error);
    return null;
  }
};