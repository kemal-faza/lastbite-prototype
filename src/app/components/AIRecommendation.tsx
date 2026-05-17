import { Sparkles } from 'lucide-react';
import { products, type Product } from '../data/products';
import { useNavigate } from 'react-router';

interface AIRecommendationProps {
  currentProductId?: number;
  title?: string;
}

// Simulasi AI: pilih produk berdasarkan kategori & diskon tertinggi
// Di real app, ini bakal panggil API, di prototype pake logika sederhana
function getRecommendations(currentId?: number): (Product & { matchScore: number })[] {
  const current = currentId ? products.find((p) => p.id === currentId) : null;

  let candidates = products.filter((p) => p.id !== currentId);

  if (current) {
    // Prioritaskan produk yang se-kategori
    const sameCategory = candidates.filter((p) => p.category === current.category);
    const others = candidates.filter((p) => p.category !== current.category);

    // Beri score berdasarkan kemiripan kategori + diskon
    candidates = [
      ...sameCategory.map((p) => ({
        ...p,
        matchScore: Math.min(99, 70 + p.discount * 0.5),
      })),
      ...others.map((p) => ({
        ...p,
        matchScore: Math.min(95, 50 + p.discount * 0.4),
      })),
    ];
  } else {
    // Home: rekomendasi berdasarkan diskon + stock rendah (populer)
    candidates = candidates
      .sort((a, b) => b.discount - a.discount || a.remaining - b.remaining)
      .map((p) => ({
        ...p,
        matchScore: Math.min(98, 60 + p.discount * 0.6),
      }));
  }

  return candidates.slice(0, 4);
}

export function AIRecommendation({ currentProductId, title }: AIRecommendationProps) {
  const navigate = useNavigate();
  const recommendations = getRecommendations(currentProductId);
  const displayTitle = title || 'Rekomendasi AI untuk kamu';

  if (recommendations.length === 0) return null;

  return (
    <div className="mb-6">
      {/* Header AI */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI</span>
        </div>
        <h2 className="font-semibold text-gray-900">{displayTitle}</h2>
      </div>

      {/* Trust indicator */}
      <div className="text-xs text-gray-500 mb-3 flex items-center gap-1">
        <span className="inline-block w-2 h-2 rounded-full bg-green-400" />
        Berdasarkan riwayat & preferensimu
      </div>

      {/* Product cards */}
      <div className="grid grid-cols-2 gap-3">
        {recommendations.map((product) => (
          <button
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-left overflow-hidden"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-28 object-cover"
              />
              {/* Match score badge */}
              <div className="absolute bottom-1.5 right-1.5 bg-black/70 backdrop-blur-sm text-white text-[10px] px-1.5 py-0.5 rounded-md font-medium">
                {product.matchScore}% cocok
              </div>
            </div>
            <div className="p-2.5">
              <h3 className="text-sm font-semibold text-gray-900 truncate">{product.name}</h3>
              <p className="text-[10px] text-gray-500 truncate">{product.store}</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-sm font-bold text-[var(--secondary)]">
                  Rp{product.discountedPrice.toLocaleString('id-ID')}
                </span>
                <span className="text-[10px] text-gray-400 line-through">
                  Rp{product.originalPrice.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Transparency note */}
      <p className="text-[10px] text-gray-400 mt-2 text-center">
        Akurasi rekomendasi AI berdasarkan pola pembelian & preferensi.  
        <span className="text-purple-500 font-medium"> Confidence score: {Math.min(...recommendations.map((r) => r.matchScore))}–{Math.max(...recommendations.map((r) => r.matchScore))}%</span>
      </p>
    </div>
  );
}
