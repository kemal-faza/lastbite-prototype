import { Heart, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useWishlist } from '../context/WishlistContext';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export function Wishlist() {
  const { ids, count } = useWishlist();
  const navigate = useNavigate();

  const wishlistedProducts = products.filter((p) => ids.includes(p.id));

  return (
    <div className="flex flex-col min-h-full bg-[var(--background)]">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center gap-3 shadow-sm sticky top-0 z-10">
        <button
          onClick={() => navigate('/profile')}
          className="p-1 -ml-1 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Kembali"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Wishlist</h1>
        <span className="text-sm text-gray-500 ml-auto">{count} item</span>
      </div>

      {/* Content */}
      <div className="p-4 flex-1">
        {wishlistedProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {wishlistedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
              <Heart className="w-12 h-12 text-red-300" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Wishlist Kosong</h2>
            <p className="text-gray-500 mb-8 max-w-[250px]">
              Simpan produk favoritmu dengan menekan icon hati di kartu produk.
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-[var(--primary)] text-white font-semibold py-3 px-8 rounded-full shadow-lg shadow-black/10 hover:bg-[#0d5254] transition-all active:scale-95"
            >
              Cari Makanan
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
