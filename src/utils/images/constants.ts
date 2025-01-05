import { ImageParams, ImageSizes, RecipeImageMapping } from './types';

export const IMAGE_PARAMS: ImageParams = {
  quality: 'auto',
  format: 'auto',
  fit: 'crop',
};

export const IMAGE_SIZES: ImageSizes = {
  small: 400,
  medium: 800,
  large: 1200,
};

// Curated recipe images mapping
export const RECIPE_IMAGES: RecipeImageMapping = {
  "BBQ Pulled Pork Sliders": "https://images.unsplash.com/photo-1513185158878-8d8c2a2a3da3",
  "Lemon Herb Salmon": "https://images.unsplash.com/photo-1485921325833-c519f76c4927",
  "Chocolate Brownies": "https://images.unsplash.com/photo-1515037893149-de7f840978e2",
};