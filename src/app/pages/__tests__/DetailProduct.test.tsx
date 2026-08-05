import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router';
import { DetailProduct } from '../DetailProduct';
import { CartProvider } from '../../context/CartContext';
import { WishlistProvider } from '../../context/WishlistContext';
import type { SellerProduct } from '../../data/sellerProducts';

let mockProducts: SellerProduct[] = [];

vi.mock('../../data/sellerProducts', () => ({
  getSellerProducts: () => mockProducts,
}));

vi.mock('sonner', () => ({ toast: { error: vi.fn(), success: vi.fn() } }));

beforeEach(() => {
  mockProducts = [];
});

function renderDetail(id: string) {
  return render(
    <CartProvider>
      <WishlistProvider>
        <MemoryRouter initialEntries={[`/product/${id}`]}>
          <Routes>
            <Route path="/product/:id" element={<DetailProduct />} />
          </Routes>
        </MemoryRouter>
      </WishlistProvider>
    </CartProvider>,
  );
}

const sellerWithNotes: SellerProduct = {
  id: 'seller-abc',
  name: 'Roti Baru',
  store: 'Toko Uji',
  quantity: 10,
  price: 5000,
  originalPrice: 10000,
  category: 'bakery',
  image: 'data:image/jpeg;base64,MOCK',
  active: true,
  createdAt: Date.now(),
  notes: 'Tanpa pengawet, dipanggang pagi ini',
};

describe('DetailProduct — catatan produk', () => {
  it('menampilkan section "Catatan Produk" saat produk punya notes', () => {
    mockProducts = [sellerWithNotes];
    renderDetail('seller-abc');
    expect(screen.getByText('Catatan Produk')).toBeInTheDocument();
    expect(screen.getByText(sellerWithNotes.notes as string)).toBeInTheDocument();
  });

  it('TIDAK menampilkan section catatan saat produk tanpa notes', () => {
    const noNotes = { ...sellerWithNotes, notes: undefined };
    mockProducts = [noNotes];
    renderDetail('seller-abc');
    expect(screen.queryByText('Catatan Produk')).not.toBeInTheDocument();
  });
});
