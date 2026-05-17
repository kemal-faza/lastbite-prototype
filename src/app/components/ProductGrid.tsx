import { ProductCard } from './ProductCard';
import { products } from '../data/products';

interface ProductGridProps {
  selectedCategory: string;
  searchQuery: string;
}

export function ProductGrid({ selectedCategory, searchQuery }: ProductGridProps) {
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.store.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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