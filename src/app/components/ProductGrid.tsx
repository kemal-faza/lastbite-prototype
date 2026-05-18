import { useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { products } from '../data/products';
import type { SortOption } from './FilterBar';

interface ProductGridProps {
  selectedCategory: string;
  searchQuery: string;
  sortBy: SortOption;
}

function parseDistance(d: string): number {
  return parseInt(d.replace(/\D/g, ''), 10) || 999;
}

function parseExpiry(e: string): number {
  const num = parseInt(e.replace(/\D/g, ''), 10) || 0;
  if (e.includes('menit') || e.includes('min')) return num;
  if (e.includes('jam')) return num * 60;
  return 999;
}

export function ProductGrid({ selectedCategory, searchQuery, sortBy }: ProductGridProps) {
  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.store.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.discountedPrice - b.discountedPrice);
        break;
      case 'price-desc':
        result.sort((a, b) => b.discountedPrice - a.discountedPrice);
        break;
      case 'distance-asc':
        result.sort((a, b) => parseDistance(a.distance) - parseDistance(b.distance));
        break;
      case 'distance-desc':
        result.sort((a, b) => parseDistance(b.distance) - parseDistance(a.distance));
        break;
      case 'expiry-asc':
        result.sort((a, b) => parseExpiry(a.expiresIn) - parseExpiry(b.expiresIn));
        break;
      default:
        break;
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-gray-900">
          {filteredProducts.length} Produk Tersedia
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 pb-32">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Tidak ada produk ditemukan</p>
        </div>
      )}
    </div>
  );
}
