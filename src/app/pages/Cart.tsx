import { useState } from 'react';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { Link } from 'react-router';

const INITIAL_CART = [
  {
    id: 1,
    name: 'Ayam Geprek Preksu',
    store: 'Preksu Geprek',
    price: 8000,
    originalPrice: 16000,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop',
  },
  {
    id: 2,
    name: 'Nasi Padang',
    store: 'RM Sederhana',
    price: 10000,
    originalPrice: 18000,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop',
  },
  {
    id: 3,
    name: 'Es Teh Tarik',
    store: 'Teh Nusantara',
    price: 5000,
    originalPrice: 10000,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop',
  },
];

export function Cart() {
  const [cartItems, setCartItems] = useState(INITIAL_CART);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(items => 
      items.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalOriginal = cartItems.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
  const totalSaved = totalOriginal - subtotal;
  const deliveryFee = subtotal > 0 ? 5000 : 0;
  const platformFee = subtotal > 0 ? 2000 : 0;
  const total = subtotal + deliveryFee + platformFee;

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
        <div className="w-24 h-24 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-12 h-12 text-[var(--secondary)]" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Keranjang Kosong</h2>
        <p className="text-gray-500 mb-8 max-w-[250px]">
          Belum ada makanan yang diselamatkan. Yuk eksplorasi produk yang ada!
        </p>
        <Link 
          to="/" 
          className="bg-[var(--primary)] text-white font-semibold py-3 px-8 rounded-full shadow-lg shadow-black/10 hover:bg-[#0d5254] transition-all active:scale-95"
        >
          Cari Makanan
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full bg-[var(--background)] pb-28">
      {/* Header */}
      <div className="bg-white pt-6 pb-4 px-4 sticky top-0 z-10 shadow-sm">
        <h1 className="text-xl font-bold text-gray-900">Keranjang</h1>
        <p className="text-sm text-gray-500 mt-1">{cartItems.length} item dari 2 toko</p>
      </div>

      <div className="p-4 space-y-4">
        {/* Cart Items */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {cartItems.map((item, index) => (
            <div 
              key={item.id} 
              className={`p-4 flex gap-4 ${index !== cartItems.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-20 h-20 object-cover rounded-xl bg-gray-100"
              />
              
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900 leading-tight">{item.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">{item.store}</p>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="p-1 -mr-1">
                      <Trash2 className="w-4 h-4 text-red-400 hover:text-red-600" />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3 flex-wrap gap-y-2">
                  <div>
                      <span className="font-bold text-[var(--secondary)] text-sm">
                      Rp {item.price.toLocaleString('id-ID')}
                    </span>
                    <span className="text-xs text-gray-400 line-through ml-2">
                      Rp {item.originalPrice.toLocaleString('id-ID')}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-gray-50 rounded-full px-2 py-1 border border-gray-200">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm text-gray-600 active:scale-95 transition-transform"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm text-[var(--secondary)] active:scale-95 transition-transform"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Saved Alert */}
        <div className="bg-[var(--primary)]/5 rounded-xl p-3 flex items-start gap-3 border border-[var(--primary)]/10">
          <div className="bg-[var(--primary)]/10 p-1.5 rounded-full mt-0.5">
            <Tag className="w-4 h-4 text-[var(--primary)]" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[var(--primary)]">Yay! Kamu hemat banyak</h4>
            <p className="text-xs text-[var(--primary)] mt-0.5">
              Dengan pesanan ini kamu menghemat <b>Rp {totalSaved.toLocaleString('id-ID')}</b> dan mencegah makanan terbuang!
            </p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow-sm p-4 space-y-3">
          <h3 className="font-semibold text-gray-900 mb-2">Ringkasan Pembayaran</h3>
          
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} item)</span>
            <span>Rp {subtotal.toLocaleString('id-ID')}</span>
          </div>
          
          <div className="flex justify-between text-sm text-gray-600">
            <span>Ongkos Kirim</span>
            <span>Rp {deliveryFee.toLocaleString('id-ID')}</span>
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <span>Biaya Layanan</span>
            <span>Rp {platformFee.toLocaleString('id-ID')}</span>
          </div>
          
          <div className="pt-3 border-t border-gray-100 flex justify-between items-center mt-2">
            <span className="font-bold text-gray-900">Total Harga</span>
            <span className="font-bold text-lg text-[var(--secondary)]">Rp {total.toLocaleString('id-ID')}</span>
          </div>
        </div>
      </div>

      {/* Checkout Bar */}
      <div className="fixed bottom-[72px] left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 max-w-md mx-auto shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)]">
        <button className="w-full bg-[var(--primary)] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-black/10 hover:bg-[#0d5254] transition-colors flex items-center justify-between active:scale-[0.98]">
          <div className="flex flex-col items-start">
            <span className="text-xs font-medium text-white/80">Total Bayar</span>
            <span className="text-sm">Rp {total.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Pesan Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </button>
      </div>
    </div>
  );
}