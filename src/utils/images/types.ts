export interface ImageParams {
  quality: 'auto';
  format: 'auto';
  fit: 'crop';
}

export interface ImageSizes {
  small: number;
  medium: number;
  large: number;
}

export type ImageSize = keyof ImageSizes;

export interface RecipeImageMapping {
  [key: string]: string;
}