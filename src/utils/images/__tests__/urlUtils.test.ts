import { describe, it, expect } from 'vitest';
import { createImagePrompt, getOptimizedImageUrl } from '../urlUtils';
import { IMAGE_PARAMS } from '../constants';

describe('urlUtils', () => {
  describe('createImagePrompt', () => {
    it('creates a proper image prompt with recipe name and description', () => {
      const recipeName = 'Chocolate Cake';
      const description = 'Rich and moist';
      const prompt = createImagePrompt(recipeName, description);
      
      expect(prompt).toContain(recipeName);
      expect(prompt).toContain(description);
      expect(prompt).toContain('professional food photography');
    });
  });

  describe('getOptimizedImageUrl', () => {
    it('returns optimized URL with correct parameters', () => {
      const baseUrl = 'https://example.com/image.jpg';
      const width = 800;
      const optimizedUrl = getOptimizedImageUrl(baseUrl, width);
      const url = new URL(optimizedUrl);
      
      expect(url.searchParams.get('q')).toBe(IMAGE_PARAMS.quality);
      expect(url.searchParams.get('fm')).toBe(IMAGE_PARAMS.format);
      expect(url.searchParams.get('fit')).toBe(IMAGE_PARAMS.fit);
      expect(url.searchParams.get('w')).toBe(width.toString());
    });
  });
});