import { Clock, MapPin, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { type Product } from '../data/products';
import { useNavigate } from 'react-router';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdded(true);
    setTimeout(() => {
      navigate('/cart');
    }, 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={() => navigate('/product/' + product.id)}
      className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-t-2xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3 bg-[var(--destructive)] text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg">
          -{product.discount}%
        </div>
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
          <Clock className="w-3 h-3 text-[var(--secondary)]" />
          <span className="text-xs font-medium text-[var(--secondary)]">{product.expiresIn}</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>

        <div className="flex items-center gap-1 text-gray-600 text-sm mb-1">
          <MapPin className="w-3 h-3" />
          <span>{product.store}</span>
          <span className="text-gray-400 mx-1">·</span>
          <span className="text-gray-500">{product.distance}</span>
        </div>

        <p className="text-xs text-[var(--destructive)] mb-3">
          Sisa {product.remaining} porsi
        </p>

        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-[var(--secondary)]">
                Rp {product.discountedPrice.toLocaleString('id-ID')}
              </span>
            </div>
            <span className="text-sm text-gray-400 line-through">
              Rp {product.originalPrice.toLocaleString('id-ID')}
            </span>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${
              isAdded
                ? 'bg-[var(--primary)]/10 text-[var(--primary)]'
                : 'bg-[var(--primary)] text-white hover:bg-[#0d5254]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            {isAdded ? 'Ditambahkan!' : 'Beli'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}