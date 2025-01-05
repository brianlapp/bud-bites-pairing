import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getCachedImage, cacheNewImage } from '../cacheUtils';
import { supabase } from '@/integrations/supabase/client';

// Mock the Supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        match: vi.fn(() => ({
          single: vi.fn()
        }))
      })),
      insert: vi.fn(),
      storage: {
        from: vi.fn(() => ({
          upload: vi.fn(),
          getPublicUrl: vi.fn(() => ({
            data: { publicUrl: 'https://example.com/test-image.jpg' }
          }))
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
      // Mock the select query to return null
      const mockSingle = vi.fn().mockResolvedValue({ data: null, error: null });
      vi.mocked(supabase.from).mockImplementation(() => ({
        select: () => ({
          match: () => ({
            single: mockSingle
          })
        })
      } as any));

      const result = await getCachedImage('Test Recipe', 'Test Description');
      expect(result).toBeNull();
    });

    it('returns public URL when cached image exists', async () => {
      // Mock the select query to return a cached image
      const mockSingle = vi.fn().mockResolvedValue({
        data: { image_path: 'test-path.jpg' },
        error: null
      });
      vi.mocked(supabase.from).mockImplementation(() => ({
        select: () => ({
          match: () => ({
            single: mockSingle
          })
        })
      } as any));

      // Mock the storage getPublicUrl
      vi.mocked(supabase.storage.from).mockImplementation(() => ({
        getPublicUrl: vi.fn(() => ({
          data: { publicUrl: 'https://example.com/test-path.jpg' }
        }))
      } as any));

      const result = await getCachedImage('Test Recipe', 'Test Description');
      expect(result).toBe('https://example.com/test-path.jpg');
    });

    it('returns null when there is an error', async () => {
      // Mock the select query to return an error
      const mockSingle = vi.fn().mockResolvedValue({
        data: null,
        error: new Error('Database error')
      });
      vi.mocked(supabase.from).mockImplementation(() => ({
        select: () => ({
          match: () => ({
            single: mockSingle
          })
        })
      } as any));

      const result = await getCachedImage('Test Recipe', 'Test Description');
      expect(result).toBeNull();
    });
  });

  describe('cacheNewImage', () => {
    it('successfully caches a new image', async () => {
      // Mock fetch
      global.fetch = vi.fn().mockResolvedValue({
        blob: () => Promise.resolve(new Blob())
      });

      // Mock storage upload
      const mockUpload = vi.fn().mockResolvedValue({ error: null });
      vi.mocked(supabase.storage.from).mockImplementation(() => ({
        upload: mockUpload,
        getPublicUrl: vi.fn(() => ({
          data: { publicUrl: 'https://example.com/cached-image.jpg' }
        }))
      } as any));

      const result = await cacheNewImage(
        'Test Recipe',
        'Test Description',
        'https://example.com/original-image.jpg'
      );

      expect(result).toBe('https://example.com/cached-image.jpg');
    });

    it('returns null when upload fails', async () => {
      // Mock fetch
      global.fetch = vi.fn().mockResolvedValue({
        blob: () => Promise.resolve(new Blob())
      });

      // Mock storage upload with error
      const mockUpload = vi.fn().mockResolvedValue({ error: new Error('Upload failed') });
      vi.mocked(supabase.storage.from).mockImplementation(() => ({
        upload: mockUpload
      } as any));

      const result = await cacheNewImage(
        'Test Recipe',
        'Test Description',
        'https://example.com/original-image.jpg'
      );

      expect(result).toBeNull();
    });
  });
});