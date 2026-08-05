import { describe, it, expect, vi, afterEach } from 'vitest';
import { compressImage, MAX_FILE_SIZE } from '../image';

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

// Helpers: stub FileReader + Image + canvas agar deterministik di jsdom
function stubFileReader(dataUrl: string) {
  vi.stubGlobal(
    'FileReader',
    class {
      result: string | ArrayBuffer | null = dataUrl;
      onload: ((ev: ProgressEvent<FileReader>) => void) | null = null;
      onerror: ((ev: ProgressEvent<FileReader>) => void) | null = null;
      readAsDataURL() {
        setTimeout(() => {
          this.onload?.(null as unknown as ProgressEvent<FileReader>);
        }, 0);
      }
    },
  );
}

function stubImage(naturalWidth: number, naturalHeight: number) {
  class MockImage {
    onload: (() => void) | null = null;
    onerror: (() => void) | null = null;
    naturalWidth = naturalWidth;
    naturalHeight = naturalHeight;
    set src(_v: string) {
      this.onload?.();
    }
  }
  vi.stubGlobal('Image', MockImage);
}

function stubCanvas() {
  const created: Array<{ width: number; height: number }> = [];
  const originalCreate = document.createElement.bind(document);
  vi.spyOn(document, 'createElement').mockImplementation(
    (tag: string, options?: ElementCreationOptions) => {
      if (tag === 'canvas') {
        const canvas = { width: 0, height: 0 };
        created.push(canvas);
        return {
          get width() {
            return created[created.length - 1].width;
          },
          set width(v: number) {
            if (created.length > 0) created[created.length - 1].width = v;
          },
          get height() {
            return created[created.length - 1].height;
          },
          set height(v: number) {
            if (created.length > 0) created[created.length - 1].height = v;
          },
          getContext: () =>
            ({ drawImage: vi.fn() }) as unknown as CanvasRenderingContext2D,
          toDataURL: () => 'data:image/jpeg;base64,REFT-MOCK',
        } as unknown as HTMLCanvasElement;
      }
      return originalCreate(tag, options);
    },
  );
  return created;
}

describe('compressImage', () => {
  it('menolak file non-gambar (type salah)', async () => {
    const file = new File(['x'], 'catatan.txt', { type: 'text/plain' });
    const result = await compressImage(file);
    expect('error' in result).toBe(true);
    if ('error' in result) expect(result.error).toMatch(/gambar/i);
  });

  it('menolak file lebih dari 5MB', async () => {
    const big = new Uint8Array(MAX_FILE_SIZE + 1);
    const file = new File([big], 'foto.png', { type: 'image/png' });
    const result = await compressImage(file);
    expect('error' in result).toBe(true);
    if ('error' in result) expect(result.error).toMatch(/5MB/i);
  });

  it('mengubah gambar valid menjadi data URL jpeg', async () => {
    stubFileReader('data:image/png;base64,ZmFrZQ==');
    stubImage(800, 600); // >= max size → harus di-resize ke 600
    const created = stubCanvas();
    const file = new File(['fake'], 'foto.png', { type: 'image/png' });
    const result = await compressImage(file);
    expect('dataUrl' in result).toBe(true);
    if ('dataUrl' in result) expect(result.dataUrl).toContain('data:image/jpeg');
    // resize: longest side jadi 600, rasio 800x600 dipertahankan
    expect(created[0].width).toBe(600);
    expect(created[0].height).toBe(450);
  });

  it('mengembalikan error saat canvas gagal memproses (drawImage throw)', async () => {
    stubFileReader('data:image/png;base64,ZmFrZQ==');
    stubImage(800, 600);
    const originalCreate = document.createElement.bind(document);
    vi.spyOn(document, 'createElement').mockImplementation(
      (tag: string, options?: ElementCreationOptions) => {
        if (tag === 'canvas') {
          return {
            width: 800,
            height: 600,
            getContext: () =>
              ({
                drawImage: vi.fn(() => {
                  throw new Error('canvas fail');
                }),
              }) as unknown as CanvasRenderingContext2D,
            toDataURL: vi.fn(),
          } as unknown as HTMLCanvasElement;
        }
        return originalCreate(tag, options);
      },
    );
    const file = new File(['fake'], 'foto.png', { type: 'image/png' });
    const result = await compressImage(file);
    expect('error' in result).toBe(true);
  });

  it('menolak gambar degenerate (naturalWidth 0)', async () => {
    stubFileReader('data:image/png;base64,ZmFrZQ==');
    stubImage(0, 0); // gambar tidak terbaca dimensinya
    stubCanvas();
    const file = new File(['fake'], 'foto.png', { type: 'image/png' });
    const result = await compressImage(file);
    expect('error' in result).toBe(true);
  });
});
