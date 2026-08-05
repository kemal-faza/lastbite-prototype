import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { AddProduct } from '../AddProduct';
import { toast } from 'sonner';

const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockAdd = vi.fn();
vi.mock('../../data/sellerProducts', () => ({
  addSellerProduct: (...args: unknown[]) => mockAdd(...args),
}));

vi.mock('sonner', () => ({
  toast: { error: vi.fn(), success: vi.fn() },
}));

const mockCompress = vi
  .fn()
  .mockResolvedValue({ dataUrl: 'data:image/jpeg;base64,FOTO-MOCK' });
vi.mock('../../utils/image', () => ({
  compressImage: (...args: unknown[]) => mockCompress(...args),
  readFileAsDataUrl: () => Promise.resolve('data:image/png;base64,PREVIEW'),
}));

beforeEach(() => {
  mockNavigate.mockClear();
  mockAdd.mockClear();
  mockCompress.mockClear();
  (toast.error as ReturnType<typeof vi.fn>).mockClear();
});

describe('AddProduct', () => {
  it('renders text input for product name (not select)', () => {
    render(
      <MemoryRouter>
        <AddProduct />
      </MemoryRouter>,
    );
    const nameInput = screen.getByLabelText(/nama produk/i);
    expect(nameInput.tagName).toBe('INPUT');
  });

  it('renders category select', () => {
    render(
      <MemoryRouter>
        <AddProduct />
      </MemoryRouter>,
    );
    expect(screen.getByLabelText(/kategori/i)).toBeInTheDocument();
  });

  it('shows alert when required fields empty', async () => {
    const user = userEvent.setup();
    window.alert = vi.fn();
    render(
      <MemoryRouter>
        <AddProduct />
      </MemoryRouter>,
    );
    await user.click(screen.getByRole('button', { name: /upload produk/i }));
    expect(window.alert).toHaveBeenCalled();
  });

  it('saves product and navigates on successful submit', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <AddProduct />
      </MemoryRouter>,
    );
    await user.type(screen.getByLabelText(/nama produk/i), 'Roti Baru');
    await user.selectOptions(screen.getByLabelText(/kategori/i), 'meals');
    await user.type(screen.getByLabelText(/jumlah sisa/i), '10');
    await user.type(screen.getByLabelText(/harga diskon/i), '5000');
    await user.click(screen.getByRole('button', { name: /upload produk/i }));

    expect(mockAdd).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/seller');
  });

  it('menampilkan preview setelah memilih file foto', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <AddProduct />
      </MemoryRouter>,
    );
    const file = new File(['foto'], 'foto.png', { type: 'image/png' });
    await user.upload(screen.getByLabelText(/foto produk/i), file);
    expect(
      await screen.findByRole('button', { name: /hapus foto/i }),
    ).toBeInTheDocument();
  });

  it('mengirim Data URL hasil kompresi ke addSellerProduct saat submit', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <AddProduct />
      </MemoryRouter>,
    );
    await user.type(screen.getByLabelText(/nama produk/i), 'Roti Baru');
    await user.selectOptions(screen.getByLabelText(/kategori/i), 'meals');
    await user.type(screen.getByLabelText(/jumlah sisa/i), '10');
    await user.type(screen.getByLabelText(/harga diskon/i), '5000');
    const file = new File(['foto'], 'foto.png', { type: 'image/png' });
    await user.upload(screen.getByLabelText(/foto produk/i), file);
    await user.click(screen.getByRole('button', { name: /upload produk/i }));

    expect(mockCompress).toHaveBeenCalledTimes(1);
    expect(mockCompress).toHaveBeenCalledWith(file);
    expect(mockAdd).toHaveBeenCalledWith(
      expect.objectContaining({ image: 'data:image/jpeg;base64,FOTO-MOCK' }),
    );
    expect(mockNavigate).toHaveBeenCalledWith('/seller');
  });

  it('menampilkan toast error saat foto bukan gambar dan tidak submit', async () => {
    // applyAccept false: biarkan file non-gambar masuk ke input walau accept="image/*",
    // supaya error validasi dari compressImage benar-benar diuji.
    const user = userEvent.setup({ applyAccept: false });
    mockCompress.mockResolvedValueOnce({
      error: 'File harus berupa gambar (JPG/PNG, dll).',
    });
    render(
      <MemoryRouter>
        <AddProduct />
      </MemoryRouter>,
    );
    await user.type(screen.getByLabelText(/nama produk/i), 'Roti Baru');
    await user.selectOptions(screen.getByLabelText(/kategori/i), 'meals');
    await user.type(screen.getByLabelText(/jumlah sisa/i), '10');
    await user.type(screen.getByLabelText(/harga diskon/i), '5000');
    const file = new File(['teks'], 'catatan.txt', { type: 'text/plain' });
    await user.upload(screen.getByLabelText(/foto produk/i), file);
    await user.click(screen.getByRole('button', { name: /upload produk/i }));

    expect(toast.error).toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith(expect.stringMatching(/gambar/i));
    expect(mockAdd).not.toHaveBeenCalled();
  });

  it('tidak menambahkan produk ganda saat tombol ditekan dua kali (submitting guard)', async () => {
    const user = userEvent.setup();
    let resolveCompress: ((v: { dataUrl: string }) => void) | undefined;
    mockCompress.mockImplementationOnce(
      () =>
        new Promise<{ dataUrl: string }>((resolve) => {
          resolveCompress = resolve;
        }),
    );
    render(
      <MemoryRouter>
        <AddProduct />
      </MemoryRouter>,
    );
    await user.type(screen.getByLabelText(/nama produk/i), 'Roti Baru');
    await user.selectOptions(screen.getByLabelText(/kategori/i), 'meals');
    await user.type(screen.getByLabelText(/jumlah sisa/i), '10');
    await user.type(screen.getByLabelText(/harga diskon/i), '5000');
    // Penting: upload file dulu agar selectedFile set → compressImage benar-benar pending
    const file = new File(['foto'], 'foto.png', { type: 'image/png' });
    await user.upload(screen.getByLabelText(/foto produk/i), file);
    const btn = screen.getByRole('button', { name: /upload produk/i });
    await user.click(btn);
    // Klik kedua simulasi double-click same-tick (fireEvent bypass disabled btn)
    // — ref guard harus menolak submit kedua sebelum compress selesai
    fireEvent.click(btn);

    // resolve kompresi → submit pertama selesai
    resolveCompress?.({ dataUrl: 'data:image/jpeg;base64,FOTO-MOCK' });
    await screen.findByRole('button', { name: /upload produk/i });

    expect(mockCompress).toHaveBeenCalledTimes(1);
    expect(mockAdd).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/seller');
  });
});
