import { IMAGE_PARAMS } from './constants';

export const createImagePrompt = (recipeName: string, recipeDescription: string): string => {
  return `A professional food photography style image of ${recipeName}. ${recipeDescription}. Bright lighting, shallow depth of field, on a clean white plate, restaurant presentation style.`;
};

export const getOptimizedImageUrl = (baseUrl: string, width: number): string => {
  const url = new URL(baseUrl);
  url.searchParams.set('q', IMAGE_PARAMS.quality);
  url.searchParams.set('fm', IMAGE_PARAMS.format);
  url.searchParams.set('fit', IMAGE_PARAMS.fit);
  url.searchParams.set('w', width.toString());
  return url.toString();
};