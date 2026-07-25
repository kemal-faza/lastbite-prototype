import { describe, it, expect } from 'vitest';
import { products } from '../products';

describe('products seed data', () => {
  it('has at least 10 products', () => {
    expect(products.length).toBeGreaterThanOrEqual(10);
  });

  it('all products have valid fields', () => {
    for (const p of products) {
      expect(p.id).toBeGreaterThan(0);
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
    const stores = new Set(products.map((p) => p.store));
    expect(stores.size).toBeGreaterThanOrEqual(5);
  });

  it('has unique IDs', () => {
    const ids = products.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
