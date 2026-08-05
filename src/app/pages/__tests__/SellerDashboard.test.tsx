import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { SellerDashboard } from '../SellerDashboard';

const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return { ...actual, useNavigate: () => mockNavigate };
});

let mockProducts: Array<{
  id: string;
  name: string;
  quantity: number;
  price: number;
  active: boolean;
}> = [];

vi.mock('../../data/sellerProducts', () => ({
  getSellerProducts: () => mockProducts,
  updateSellerProduct: vi.fn(),
  deleteSellerProduct: vi.fn(),
  toggleProductActive: vi.fn(),
}));

beforeEach(() => {
  mockNavigate.mockClear();
  mockProducts = [];
  localStorage.clear();
});

describe('SellerDashboard stats', () => {
  it('shows zero stats when no products', () => {
    render(
      <MemoryRouter>
        <SellerDashboard />
      </MemoryRouter>,
    );
    expect(screen.getAllByText('0').length).toBeGreaterThanOrEqual(2);
  });

  it('calculates stats from real seller products', () => {
    mockProducts = [
      { id: 'seller-1', name: 'A', quantity: 10, price: 100, active: true },
      { id: 'seller-2', name: 'B', quantity: 5, price: 200, active: true },
    ];
    render(
      <MemoryRouter>
        <SellerDashboard />
      </MemoryRouter>,
    );
    // Total Stok = 15, Produk Aktif = 2
    expect(screen.getAllByText('15').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('does not show hardcoded todayProducts (Roti Pisang)', () => {
    render(
      <MemoryRouter>
        <SellerDashboard />
      </MemoryRouter>,
    );
    expect(screen.queryByText('Roti Pisang')).not.toBeInTheDocument();
  });

  it('Total Stok/Produk Aktif/Stok Tersisa hanya menghitung produk aktif', () => {
    mockProducts = [
      { id: 'seller-1', name: 'A', quantity: 10, price: 100, active: true },
      { id: 'seller-2', name: 'B', quantity: 5, price: 200, active: true },
      { id: 'seller-3', name: 'C', quantity: 3, price: 300, active: false },
    ];
    render(
      <MemoryRouter>
        <SellerDashboard />
      </MemoryRouter>,
    );
    // Total Stok = 10+5+3 = 18
    expect(screen.getByText('18')).toBeInTheDocument();
    // Produk Aktif = 2
    expect(screen.getAllByText('2').length).toBeGreaterThanOrEqual(1);
    // Stok Tersisa = 10+5 = 15
    expect(screen.getAllByText('15').length).toBeGreaterThanOrEqual(1);
  });

  it('menampilkan label "Stok Tersisa" dan bukan "Total Stok" dobel', () => {
    mockProducts = [
      { id: 'seller-1', name: 'A', quantity: 10, price: 100, active: true },
    ];
    render(
      <MemoryRouter>
        <SellerDashboard />
      </MemoryRouter>,
    );
    expect(screen.getByText('Total Stok')).toBeInTheDocument();
    expect(screen.getByText('Stok Tersisa')).toBeInTheDocument();
    expect(screen.getAllByText('Total Stok')).toHaveLength(1);
  });
});
