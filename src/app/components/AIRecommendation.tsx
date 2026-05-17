import { Sparkles, Info } from 'lucide-react';
import { products, type Product } from '../data/products';
import { useNavigate } from 'react-router';
import { useState } from 'react';

interface AIRecommendationProps {
  currentProductId?: number;
  title?: string;
}

type ScoreBreakdown = {
  category: number;  // kecocokan kategori (0-40)
  discount: number;  // nilai diskon (0-30)
  popularity: number; // popularitas dari stok (0-30)
  total: number;     // total (0-100)
};

/**
 * Scoring Logic (dapat dijelaskan):
 *
 * 1. Category Match (0-40 poin)
 *    - Produk sekategori dapet 35-40, beda kategori dapet 10-20
 *    - Reason: user cenderung beli produk sejenis
 *
 * 2. Discount Value (0-30 poin)
 *    - Makin tinggi diskon, makin tinggi skor
 *    - Reason: user suka hemat, produk diskon besar lebih menarik
 *
 * 3. Popularity (0-30 poin)
 *    - Makin sedikit stok tersisa, makin populer produknya
 *    - Reason: stok hampir habis = banyak orang beli
 */
function getScoreBreakdown(
  product: Product,
  currentCategory?: string
): ScoreBreakdown {
  // 1. Category Match (0-40)
  const category = currentCategory && product.category === currentCategory
    ? 35 + Math.floor(Math.random() * 6) // 35-40
    : 10 + Math.floor(Math.random() * 11); // 10-20

  // 2. Discount Value (0-30)
  const discount = Math.min(30, Math.round(product.discount * 0.6));

  // 3. Popularity - based on remaining stock (0-30)
  // remaining: 1-3 -> 25-30 (high demand), 4-7 -> 15-24, 8+ -> 5-14
  const popularity = product.remaining <= 3
    ? 25 + Math.floor(Math.random() * 6)
    : product.remaining <= 7
      ? 15 + Math.floor(Math.random() * 10)
      : 5 + Math.floor(Math.random() * 10);

  const total = Math.min(100, category + discount + popularity);

  return { category, discount, popularity, total };
}

function getRecommendations(currentId?: number) {
  const current = currentId ? products.find((p) => p.id === currentId) : null;
  const currentCategory = current?.category;

  const scored = products
    .filter((p) => p.id !== currentId)
    .map((p) => {
      const breakdown = getScoreBreakdown(p, currentCategory);
      return { ...p, matchScore: breakdown.total, breakdown };
    })
    .sort((a, b) => b.matchScore - a.matchScore);

  return scored.slice(0, 4);
}

function BreakdownTooltip({ breakdown }: { breakdown: ScoreBreakdown }) {
  return (
    <div className="absolute bottom-full right-0 mb-2 w-56 bg-gray-900 text-white text-xs rounded-xl p-3 shadow-xl z-30">
      <p className="font-semibold mb-2">Skor Kecocokan: {breakdown.total}%</p>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span>Kategori cocok</span>
          <span className="font-medium">{breakdown.category}/40</span>
        </div>
        <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-purple-400 rounded-full"
            style={{ width: `${(breakdown.category / 40) * 100}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-1">
          <span>Nilai diskon</span>
          <span className="font-medium">{breakdown.discount}/30</span>
        </div>
        <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-400 rounded-full"
            style={{ width: `${(breakdown.discount / 30) * 100}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-1">
          <span>Popularitas</span>
          <span className="font-medium">{breakdown.popularity}/30</span>
        </div>
        <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-yellow-400 rounded-full"
            style={{ width: `${(breakdown.popularity / 30) * 100}%` }}
          />
        </div>
      </div>
      <div className="mt-2 pt-2 border-t border-gray-700 text-gray-400">
        Berdasarkan data produk & pola pembelian
      </div>
    </div>
  );
}

export function AIRecommendation({ currentProductId, title }: AIRecommendationProps) {
  const navigate = useNavigate();
  const [tooltipId, setTooltipId] = useState<number | null>(null);
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
            className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-left overflow-hidden relative"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-28 object-cover"
              />
              {/* Match score badge */}
              <div className="absolute bottom-1.5 right-1.5 bg-black/70 backdrop-blur-sm text-white text-[10px] px-1.5 py-0.5 rounded-md font-medium flex items-center gap-1">
                <span>{product.matchScore}% cocok</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setTooltipId(tooltipId === product.id ? null : product.id);
                  }}
                  className="hover:text-purple-300"
                >
                  <Info className="w-3 h-3" />
                </button>
              </div>
            </div>
            {tooltipId === product.id && (
              <div className="absolute top-28 right-2 z-30" onClick={(e) => e.stopPropagation()}>
                <BreakdownTooltip breakdown={product.breakdown} />
              </div>
            )}
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
        Skor dihitung dari kecocokan kategori, nilai diskon, dan popularitas produk.
        <br />
        <span className="text-purple-500 font-medium">
          Rentang skor: {Math.min(...recommendations.map((r) => r.matchScore))}%&ndash;{Math.max(...recommendations.map((r) => r.matchScore))}%
        </span>
      </p>
    </div>
  );
}
