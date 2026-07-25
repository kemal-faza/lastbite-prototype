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
  it('seeds 4 demo products when localStorage is empty', () => {
    const products = getSellerProducts();
    expect(products).toHaveLength(4);
    expect(products[0].name).toBe('Roti Coklat');
    expect(products[0].id).toBe('seed-1');
    expect(products[0].active).toBe(true);
    expect(products[3].name).toBe('Dimsum Ayam');
    expect(products[3].active).toBe(false); // demo inactive product
  });

  it('does NOT re-seed when products already exist', () => {
    getSellerProducts(); // seeds
    const products = getSellerProducts();
    expect(products).toHaveLength(4); // still 4, not doubled
  });

  it('returns empty array when localStorage has invalid JSON (corrupt)', () => {
    localStorage.setItem(STORAGE_KEY, 'not-json-at-all');
    console.error = vi.fn();
    expect(getSellerProducts()).toEqual([]);
  });

  it('returns parsed products from localStorage (skips seed)', () => {
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
    expect(getSellerProducts()).toHaveLength(1); // not 4 seed
  });
});

describe('addSellerProduct', () => {
  it('adds product with generated id alongside seed products', () => {
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
    // 4 seed + 1 new = 5 total
    expect(products).toHaveLength(5);
    const added = products.find((p) => p.id.startsWith('seller-'));
    expect(added).toBeDefined();
    expect(added!.name).toBe('Roti Baru');
    expect(added!.image).toBe('');
    expect(added!.active).toBe(true);
  });

  it('appends to existing products (including seed)', () => {
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
    // 4 seed + 2 new = 6
    expect(getSellerProducts()).toHaveLength(6);
  });
});

// Helper: find first non-seed product (user-added)
function firstUserProduct(): SellerProduct | undefined {
  return getSellerProducts().find((p) => p.id.startsWith('seller-'));
}

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
    const added = firstUserProduct()!;
    updateSellerProduct(added.id, { name: 'New', quantity: 10 });
    const after = getSellerProducts();
    const updated = after.find((p) => p.id === added.id);
    expect(updated!.name).toBe('New');
    expect(updated!.quantity).toBe(10);
    expect(updated!.price).toBe(100); // unchanged
  });

  it('does nothing if product not found', () => {
    updateSellerProduct('nonexistent', { name: 'X' });
    // Seed products still present, not wiped
    expect(getSellerProducts().length).toBeGreaterThan(0);
  });
});

describe('deleteSellerProduct', () => {
  it('removes user-added product by id (keeps seed)', () => {
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
    const addedA = firstUserProduct()!;
    deleteSellerProduct(addedA.id);
    // 4 seed + 1 remaining user product = 5
    expect(getSellerProducts()).toHaveLength(5);
  });

  it('can delete seed products too', () => {
    const seed = getSellerProducts(); // seeds
    deleteSellerProduct(seed[0].id);
    expect(getSellerProducts()).toHaveLength(3);
  });

  it('does nothing if id not found', () => {
    deleteSellerProduct('nonexistent');
    // Seed products preserved
    expect(getSellerProducts().length).toBeGreaterThan(0);
  });
});

describe('toggleProductActive', () => {
  it('flips active from true to false on user product', () => {
    addSellerProduct({
      name: 'A',
      store: 'X',
      quantity: 1,
      price: 100,
      originalPrice: 200,
      category: 'meals',
    });
    const added = firstUserProduct()!;
    expect(added.active).toBe(true);
    toggleProductActive(added.id);
    const toggled = getSellerProducts().find((p) => p.id === added.id);
    expect(toggled!.active).toBe(false);
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
    const added = firstUserProduct()!;
    toggleProductActive(added.id); // true → false
    toggleProductActive(added.id); // false → true
    const toggled = getSellerProducts().find((p) => p.id === added.id);
    expect(toggled!.active).toBe(true);
  });
});
