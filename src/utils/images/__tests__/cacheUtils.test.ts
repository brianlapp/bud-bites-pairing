import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getCachedImage, cacheNewImage } from '../cacheUtils';
import { supabase } from '@/integrations/supabase/client';

vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        match: vi.fn(() => ({
          single: vi.fn()
        }))
      })),
      storage: {
        from: vi.fn(() => ({
          upload: vi.fn(),
          getPublicUrl: vi.fn()
        }))
      }
    }))
  }
}));

describe('cacheUtils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getCachedImage', () => {
    it('returns null when no cached image exists', async () => {
      const result = await getCachedImage('Test Recipe', 'Test Description');
      expect(result).toBeNull();
    });

    it('returns public URL when cached image exists', async () => {
      const mockPublicUrl = 'https://example.com/cached-image.jpg';
      vi.mocked(supabase.from).mockImplementationOnce(() => ({
        select: () => ({
          match: () => ({
            single: () => Promise.resolve({ 
              data: { image_path: 'test-path' },
              error: null
            })
          })
        })
      }));

      const result = await getCachedImage('Test Recipe', 'Test Description');
      expect(result).toBe(mockPublicUrl);
    });
  });
});