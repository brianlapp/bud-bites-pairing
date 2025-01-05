import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getMatchingImage } from '../imageService';
import { RECIPE_IMAGES } from '../constants';
import * as cacheUtils from '../cacheUtils';
import { supabase } from '@/integrations/supabase/client';

vi.mock('../cacheUtils');
vi.mock('@/integrations/supabase/client');

describe('imageService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getMatchingImage', () => {
    it('returns curated image URL when recipe exists in mapping', async () => {
      const recipeName = Object.keys(RECIPE_IMAGES)[0];
      const result = await getMatchingImage(recipeName, 'Test Description');
      expect(result).toContain(RECIPE_IMAGES[recipeName]);
    });

    it('returns cached image URL when available', async () => {
      const cachedUrl = 'https://example.com/cached.jpg';
      vi.mocked(cacheUtils.getCachedImage).mockResolvedValueOnce(cachedUrl);
      
      const result = await getMatchingImage('New Recipe', 'Test Description');
      expect(result).toContain(cachedUrl);
    });

    it('returns placeholder when no image is found', async () => {
      vi.mocked(cacheUtils.getCachedImage).mockResolvedValueOnce(null);
      vi.mocked(supabase.functions.invoke).mockResolvedValueOnce({ 
        data: null, 
        error: new Error('Failed to generate') 
      });
      
      const result = await getMatchingImage('Unknown Recipe', 'Test Description');
      expect(result).toBe('/placeholder.svg');
    });
  });
});