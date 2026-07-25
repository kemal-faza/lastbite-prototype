import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { AddProduct } from '../AddProduct';

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

beforeEach(() => {
  mockNavigate.mockClear();
  mockAdd.mockClear();
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
});
