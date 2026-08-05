export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export type CompressResult = { dataUrl: string } | { error: string };

/** Baca File menjadi Data URL (dipakai preview & kompresi). */
export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Gagal membaca file'));
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Gagal memuat gambar'));
    img.src = src;
  });
}

/** Resize gambar: longest side maks 600px, rasio dipertahankan. */
export function resizeToCanvas(
  img: HTMLImageElement,
  max: number,
): HTMLCanvasElement {
  const scale = Math.min(
    1,
    max / Math.max(img.naturalWidth, img.naturalHeight, 1),
  );
  const width = Math.max(1, Math.round(img.naturalWidth * scale));
  const height = Math.max(1, Math.round(img.naturalHeight * scale));
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas tidak didukung');
  ctx.drawImage(img, 0, 0, width, height);
  return canvas;
}

/** Kompresi: validasi → baca → resize 600px → JPEG 0.7 → Data URL. */
export async function compressImage(file: File): Promise<CompressResult> {
  if (!file.type.startsWith('image/')) {
    return { error: 'File harus berupa gambar (JPG/PNG, dll).' };
  }
  if (file.size > MAX_FILE_SIZE) {
    return { error: 'Ukuran foto maksimal 5MB. Pilih foto yang lebih kecil.' };
  }
  try {
    const dataUrl = await readFileAsDataUrl(file);
    const img = await loadImage(dataUrl);
    if (img.naturalWidth === 0 || img.naturalHeight === 0) {
      return { error: 'File gambar tidak terbaca. Coba gunakan foto lain.' };
    }
    const canvas = resizeToCanvas(img, 600);
    return { dataUrl: canvas.toDataURL('image/jpeg', 0.7) };
  } catch {
    return { error: 'Gagal memproses foto. Coba gunakan foto lain.' };
  }
}
