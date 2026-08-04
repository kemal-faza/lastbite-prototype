import { describe, it, expect, beforeEach } from 'vitest';
import { getSellerProducts } from '../sellerProducts';
import { sellerProductToProduct } from '../../components/ProductGrid';

beforeEach(() => {
  localStorage.clear();
});

describe('seed catalog (single source of truth = sellerProducts)', () => {
  it('has at least 10 products', () => {
    const products = getSellerProducts();
    expect(products.length).toBeGreaterThanOrEqual(10);
  });

  it('all products have valid fields when mapped to buyer shape', () => {
    const products = getSellerProducts().map(sellerProductToProduct);
    for (const p of products) {
      expect(p.id).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(p.store).toBeTruthy();
      expect(p.originalPrice).toBeGreaterThan(0);
      expect(p.discountedPrice).toBeGreaterThan(0);
      expect(p.discount).toBeGreaterThan(0);
      expect(p.expiresIn).toBeTruthy();
      expect(p.remaining).toBeGreaterThan(0);
      expect(p.distance).toBeTruthy();
      expect(p.category).toBeTruthy();
      expect(p.image).toBeTruthy();
    }
  });

  it('has products from multiple stores', () => {
    const products = getSellerProducts();
    const stores = new Set(products.map((p) => p.store));
    expect(stores.size).toBeGreaterThanOrEqual(5);
  });

  it('has unique IDs', () => {
    const products = getSellerProducts();
    const ids = products.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has no duplicate product names', () => {
    const products = getSellerProducts();
    const names = products.map((p) => p.name);
    expect(new Set(names).size).toBe(names.length);
  });
});