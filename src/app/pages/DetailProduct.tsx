import { useParams, useNavigate } from 'react-router';
import { ChevronLeft, Clock, MapPin, Star, Check, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
import { products } from '../data/products';
import { AIRecommendation } from '../components/AIRecommendation';
import { QueueIndicator } from '../components/QueueIndicator';

const reviews = [
  { id: 1, name: 'Andi', rating: 5, text: 'Enak banget, ayamnya masih fresh. Recommended buat anak kos!' },
  { id: 2, name: 'Sari', rating: 4, text: 'Lumayan buat anak kos, murah meriah. Packagingnya rapi.' },
  { id: 3, name: 'Dimas', rating: 5, text: 'Sudah 3x beli di sini, ga pernah mengecewakan.' },
];

export function DetailProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <p className="text-gray-500 mb-4">Produk tidak ditemukan</p>
        <button
          onClick={() => navigate('/')}
          className="text-[var(--primary)] font-medium"
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header */}
      <header className="bg-[var(--primary)] text-white px-4 py-3 flex items-center gap-3 shrink-0">
        <button onClick={() => navigate(-1)} className="p-1">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold">Detail Produk</h1>
      </header>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-28">
        {/* Product image */}
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover"
          />
          <div className="absolute top-3 right-3 bg-[var(--destructive)] text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg">
            -{product.discount}%
          </div>
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
            <Clock className="w-3 h-3 text-[var(--secondary)]" />
            <span className="text-xs font-medium text-[var(--secondary)]">{product.expiresIn}</span>
          </div>
        </div>

        {/* Product info */}
        <div className="px-4 py-4 space-y-4">
          {/* Hygiene badge + name */}
          <div>
            <div className="inline-flex items-center gap-1 bg-[var(--primary)]/10 text-[var(--primary)] px-3 py-1 rounded-full text-xs font-medium mb-2">
              <Check className="w-3 h-3" />
              Higienis
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
            <p className="text-gray-500 text-sm">{product.store}</p>
          </div>

          {/* Price */}
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[var(--secondary)]">
                Rp{product.discountedPrice.toLocaleString('id-ID')}
              </span>
              <span className="text-sm text-gray-400 line-through">
                Rp{product.originalPrice.toLocaleString('id-ID')}
              </span>
            </div>
            <p className="text-[var(--destructive)] font-medium text-sm mt-1">
              Sisa {product.remaining} porsi
            </p>
          </div>

          {/* Time info */}
          <div className="text-gray-500 text-sm space-y-0.5">
            <p>Diproduksi: 12.00 WIB | Batas konsumsi: 19.00 WIB</p>
          </div>

          {/* Queue */}
          <QueueIndicator initialQueue={3} storeName={product.store} />

          {/* Description */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Deskripsi</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              {product.name} dari {product.store}. Masih segar dan layak konsumsi, 
              dibuat pada hari yang sama dengan standar kebersihan terjaga. 
              Hemat hingga {product.discount}% dan bantu kurangi food waste!
            </p>
          </div>

          {/* Trust & Safety */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Kenapa Produk Ini Aman</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-green-50 rounded-xl p-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mb-2">
                  <Check className="w-4 h-4 text-green-700" />
                </div>
                <p className="text-xs font-semibold text-gray-900">Diproduksi Hari Ini</p>
                <p className="text-[10px] text-gray-500 mt-0.5">Makanan fresh, bukan sisa kemarin</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <Check className="w-4 h-4 text-blue-700" />
                </div>
                <p className="text-xs font-semibold text-gray-900">Higienis & Bersih</p>
                <p className="text-[10px] text-gray-500 mt-0.5">Standar kebersihan terjamin</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                  <Check className="w-4 h-4 text-purple-700" />
                </div>
                <p className="text-xs font-semibold text-gray-900">Kemasan Food Grade</p>
                <p className="text-[10px] text-gray-500 mt-0.5">Dikemas dengan standar aman</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-3">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mb-2">
                  <Clock className="w-4 h-4 text-amber-700" />
                </div>
                <p className="text-xs font-semibold text-gray-900">Batas Konsumsi Jelas</p>
                <p className="text-[10px] text-gray-500 mt-0.5">Informasi waktu expired transparan</p>
              </div>
            </div>
            <p className="text-[10px] text-gray-400 mt-3 text-center">
              Setiap produk diperiksa sebelum dipajang. Belanja hemat tetap aman!
            </p>
          </div>

          {/* Reviews */}
          <div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">Ulasan Pembeli</h3>
            <div className="flex items-center gap-1 mb-3">
              <Star className="w-4 h-4 fill-[var(--secondary)] text-[var(--secondary)]" />
              <span className="font-semibold text-gray-900">4.7</span>
              <span className="text-gray-500 text-sm">(12 ulasan)</span>
            </div>

            <div className="space-y-3">
              {reviews.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-50 rounded-xl p-3"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900 text-sm">{review.name}</span>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < review.rating
                              ? 'fill-[var(--secondary)] text-[var(--secondary)]'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{review.text}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* AI Recommendation */}
          <div className="pt-2">
            <AIRecommendation currentProductId={product.id} title="Kamu mungkin juga suka" />
          </div>
        </div>
      </div>

      {/* Fixed bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-sm border-t border-gray-100 px-4 py-3 z-30">
        <button
          onClick={() => navigate(`/order/confirm/${product.id}`)}
          className="w-full bg-[var(--primary)] text-white font-semibold py-3.5 rounded-2xl flex items-center justify-center gap-2 hover:bg-[var(--primary)]/90 active:scale-[0.98] transition-all"
        >
          <ShoppingBag className="w-5 h-5" />
          Ambil Pesanan Ini
        </button>
        <p className="text-center text-gray-400 text-xs mt-1.5">
          Pick up &lt;30 menit
        </p>
      </div>
    </div>
  );
}
