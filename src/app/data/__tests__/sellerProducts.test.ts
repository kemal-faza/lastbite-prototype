import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getSellerProducts,
  addSellerProduct,
  updateSellerProduct,
  deleteSellerProduct,
  toggleProductActive,
  STORAGE_KEY,
  type SellerProduct,
} from '../sellerProducts';

beforeEach(() => {
  localStorage.clear();
});

describe('getSellerProducts', () => {
  it('returns empty array when localStorage is empty', () => {
    expect(getSellerProducts()).toEqual([]);
  });

  it('returns empty array when localStorage has invalid JSON (corrupt)', () => {
    localStorage.setItem(STORAGE_KEY, 'not-json-at-all');
    console.error = vi.fn();
    expect(getSellerProducts()).toEqual([]);
  });

  it('returns parsed products from localStorage', () => {
    const mock: SellerProduct[] = [
      {
        id: 'seller-123',
        name: 'Roti Coklat',
        store: 'Test Store',
        quantity: 5,
        price: 3000,
        originalPrice: 7500,
        category: 'bakery',
        image: '',
        active: true,
        createdAt: 123,
      },
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mock));
    expect(getSellerProducts()).toEqual(mock);
  });
});

describe('addSellerProduct', () => {
  it('adds product with generated id and defaults', () => {
    const input = {
      name: 'Roti Baru',
      store: 'Test Store',
      quantity: 10,
      price: 5000,
      originalPrice: 10000,
      category: 'bakery' as const,
      notes: 'fresh',
    };
    addSellerProduct(input);
    const products = getSellerProducts();
    expect(products).toHaveLength(1);
    expect(products[0].id).toMatch(/^seller-\d+-\d+$/);
    expect(products[0].name).toBe('Roti Baru');
    expect(products[0].image).toBe('');
    expect(products[0].active).toBe(true);
  });

  it('appends to existing products', () => {
    addSellerProduct({
      name: 'A',
      store: 'X',
      quantity: 1,
      price: 100,
      originalPrice: 200,
      category: 'meals',
    });
    addSellerProduct({
      name: 'B',
      store: 'X',
      quantity: 2,
      price: 200,
      originalPrice: 400,
      category: 'drinks',
    });
    expect(getSellerProducts()).toHaveLength(2);
  });
});

describe('updateSellerProduct', () => {
  it('updates specific fields of an existing product', () => {
    addSellerProduct({
      name: 'Old',
      store: 'X',
      quantity: 5,
      price: 100,
      originalPrice: 200,
      category: 'meals',
    });
    const before = getSellerProducts();
    updateSellerProduct(before[0].id, { name: 'New', quantity: 10 });
    const after = getSellerProducts();
    expect(after[0].name).toBe('New');
    expect(after[0].quantity).toBe(10);
    expect(after[0].price).toBe(100); // unchanged
  });

  it('does nothing if product not found', () => {
    updateSellerProduct('nonexistent', { name: 'X' });
    expect(getSellerProducts()).toEqual([]);
  });
});

describe('deleteSellerProduct', () => {
  it('removes product by id', () => {
    addSellerProduct({
      name: 'A',
      store: 'X',
      quantity: 1,
      price: 100,
      originalPrice: 200,
      category: 'meals',
    });
    addSellerProduct({
      name: 'B',
      store: 'X',
      quantity: 1,
      price: 100,
      originalPrice: 200,
      category: 'meals',
    });
    const products = getSellerProducts();
    deleteSellerProduct(products[0].id);
    expect(getSellerProducts()).toHaveLength(1);
    expect(getSellerProducts()[0].name).toBe('B');
  });

  it('does nothing if id not found', () => {
    deleteSellerProduct('nonexistent');
    expect(getSellerProducts()).toEqual([]);
  });
});

describe('toggleProductActive', () => {
  it('flips active from true to false', () => {
    addSellerProduct({
      name: 'A',
      store: 'X',
      quantity: 1,
      price: 100,
      originalPrice: 200,
      category: 'meals',
    });
    const id = getSellerProducts()[0].id;
    expect(getSellerProducts()[0].active).toBe(true);
    toggleProductActive(id);
    expect(getSellerProducts()[0].active).toBe(false);
  });

  it('flips active from false to true', () => {
    addSellerProduct({
      name: 'A',
      store: 'X',
      quantity: 1,
      price: 100,
      originalPrice: 200,
      category: 'meals',
    });
    const id = getSellerProducts()[0].id;
    toggleProductActive(id);
    toggleProductActive(id);
    expect(getSellerProducts()[0].active).toBe(true);
  });
});
