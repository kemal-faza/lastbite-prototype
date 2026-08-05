import { describe, it, expect } from 'vitest';
import { sellerProductToProduct } from '../ProductGrid';
import type { SellerProduct } from '../../data/sellerProducts';

describe('sellerProductToProduct', () => {
  it('converts seller product to product-compatible shape', () => {
    const seller: SellerProduct = {
      id: 'seller-abc',
      name: 'Roti Baru',
      store: 'Test Store',
      quantity: 10,
      price: 5000,
      originalPrice: 10000,
      category: 'bakery',
      image: '',
      active: true,
      createdAt: Date.now(),
    };
    const product = sellerProductToProduct(seller);
    expect(product.id).toBe('seller-abc');
    expect(product.name).toBe('Roti Baru');
    expect(product.store).toBe('Test Store');
    expect(product.discountedPrice).toBe(5000);
    expect(product.originalPrice).toBe(10000);
    expect(product.discount).toBe(50);
    expect(product.remaining).toBe(10);
    expect(product.expiresIn).toBe('6 jam');
    expect(product.distance).toBe('1km');
    expect(product.category).toBe('bakery');
    expect(product.image).toBe('');
  });

  it('handles edge case: originalPrice=0 (avoids division by zero)', () => {
    const seller: SellerProduct = {
      id: 'seller-xyz',
      name: 'Free',
      store: 'X',
      quantity: 1,
      price: 0,
      originalPrice: 0,
      category: 'meals',
      image: '',
      active: true,
      createdAt: 0,
    };
    const product = sellerProductToProduct(seller);
    expect(product.discount).toBe(0);
  });

  it('uses expiresIn and distance when provided by the seed catalog', () => {
    const seller: SellerProduct = {
      id: 'seed-6',
      name: 'Roti Keju',
      store: 'Roti Ibu Tutik',
      quantity: 6,
      price: 3500,
      originalPrice: 8000,
      category: 'bakery',
      image: 'x.png',
      active: true,
      createdAt: 0,
      expiresIn: '5 jam',
      distance: '1.2km',
    };
    const product = sellerProductToProduct(seller);
    expect(product.expiresIn).toBe('5 jam');
    expect(product.distance).toBe('1.2km');
  });
});

describe('sellerProductToProduct notes mapping', () => {
  const base: SellerProduct = {
    id: 'seller-abc',
    name: 'Roti Baru',
    store: 'Toko Uji',
    quantity: 10,
    price: 5000,
    originalPrice: 10000,
    category: 'bakery',
    image: '',
    active: true,
    createdAt: Date.now(),
  };

  it('memetakan notes saat ada', () => {
    const product = sellerProductToProduct({ ...base, notes: 'Tanpa pengawet' });
    expect(product.notes).toBe('Tanpa pengawet');
  });

  it('notes undefined saat tidak ada', () => {
    const product = sellerProductToProduct(base);
    expect(product.notes).toBeUndefined();
  });
});
