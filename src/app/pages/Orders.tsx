import { Clock, CheckCircle, Package, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router';

const orders = [
  { id: 1, name: 'Ayam Geprek Preksu', store: 'Preksu Geprek', price: 8000, status: 'Siap diambil', code: 'LAST-8264' },
  { id: 2, name: 'Es Teh Tarik', store: 'Teh Nusantara', price: 5000, status: 'Selesai', code: 'LAST-7912' },
];

export function Orders() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full w-full">
      <header className="bg-[var(--primary)] text-white px-4 py-4 shadow-md">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold">Pesanan Saya</h1>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-28 space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">{order.name}</h3>
              <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                order.status === 'Siap diambil'
                  ? 'bg-[var(--secondary)]/10 text-[var(--secondary)]'
                  : 'bg-green-100 text-green-700'
              }`}>
                {order.status}
              </span>
            </div>
            <p className="text-sm text-gray-500">{order.store}</p>
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <span className="font-bold text-[var(--secondary)]">Rp {order.price.toLocaleString('id-ID')}</span>
              <span className="text-xs text-gray-400 font-mono">{order.code}</span>
            </div>
            {order.status === 'Siap diambil' && (
              <button
                onClick={() => navigate(`/order/confirm/${order.id}`)}
                className="w-full mt-1 py-2 bg-[var(--primary)] text-white text-sm font-medium rounded-xl hover:opacity-90 transition-opacity"
              >
                Lihat Detail Pickup
              </button>
            )}
          </div>
        ))}
        {orders.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Belum ada pesanan</p>
          </div>
        )}
      </div>
    </div>
  );
}
