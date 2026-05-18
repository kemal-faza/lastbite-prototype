import { useParams, useNavigate } from 'react-router';
import { ChevronLeft, Check, Clock, MapPin, Navigation } from 'lucide-react';
import { motion } from 'motion/react';
import { products } from '../data/products';
import { QueueIndicator } from '../components/QueueIndicator';

export function Confirmation() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <p className="text-gray-500 mb-4">Pesanan tidak ditemukan</p>
        <button
          onClick={() => navigate('/')}
          className="text-[var(--primary)] font-medium"
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  const pickupCode = `LAST-${1000 + product.id * 7}`;

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header */}
      <header className="bg-[var(--primary)] text-white px-4 py-3 flex items-center gap-3 shrink-0">
        <button onClick={() => navigate(-1)} className="p-1">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold">Konfirmasi Pesanan</h1>
      </header>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {/* Success icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="flex flex-col items-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-3">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Pesanan Dikonfirmasi!
          </h2>
        </motion.div>

        {/* Pickup code */}
        <div className="text-center">
          <p className="text-gray-500 text-sm mb-2">Kode Pickup:</p>
          <div className="bg-[var(--secondary)]/10 rounded-xl p-4 inline-block">
            <p className="text-3xl font-bold tracking-widest text-gray-900">
              {pickupCode}
            </p>
          </div>
        </div>

        {/* Timer */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5">
            <Clock className="w-5 h-5 text-[var(--destructive)]" />
            <span className="text-sm text-gray-600">Selesaikan dalam</span>
          </div>
          <p className="text-2xl font-bold text-[var(--destructive)] mt-1">30:00</p>
        </div>
        <QueueIndicator initialQueue={4} storeName={product.store} />
HV|
        {/* Order detail card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Detail Pesanan</h3>
          <div className="flex items-start gap-3">
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div className="flex-1">
              <p className="font-semibold text-gray-900">{product.name}</p>
              <p className="text-gray-500 text-sm">{product.store}</p>
              <p className="text-[var(--secondary)] font-bold mt-1">
                1x Rp{product.discountedPrice.toLocaleString('id-ID')}
              </p>
            </div>
          </div>
        </div>

        {/* Pickup location card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Lokasi Pengambilan</h3>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-[var(--primary)]/10 rounded-full flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-[var(--primary)]" />
            </div>
            <div>
              <p className="font-medium text-gray-900">{product.store}</p>
              <p className="text-gray-500 text-sm">Jl. Prof. Soedarto, Tembalang</p>
              <p className="text-gray-500 text-sm">No. XX, Semarang</p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          <button
            className="w-full bg-[var(--secondary)] text-white font-semibold py-3.5 rounded-2xl flex items-center justify-center gap-2 hover:bg-[var(--secondary)]/90 active:scale-[0.98] transition-all"
          >
            <Navigation className="w-5 h-5" />
            Lihat Petunjuk Jalan
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full border-2 border-[var(--primary)] text-[var(--primary)] font-semibold py-3.5 rounded-2xl hover:bg-[var(--primary)]/5 active:scale-[0.98] transition-all"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    </div>
  );
}