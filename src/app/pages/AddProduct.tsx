import { useState } from 'react';
import { ArrowLeft, Camera } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { addSellerProduct } from '../data/sellerProducts';

const CATEGORIES = [
  { value: '', label: 'Pilih kategori', disabled: true },
  { value: 'meals', label: 'Makanan Berat' },
  { value: 'bakery', label: 'Roti & Kue' },
  { value: 'drinks', label: 'Minuman' },
  { value: 'snacks', label: 'Cemilan' },
] as const;

export function AddProduct() {
  const navigate = useNavigate();
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName || !category || !quantity || !price) {
      alert('Mohon isi nama produk, kategori, jumlah, dan harga!');
      return;
    }
    addSellerProduct({
      name: productName,
      store: 'Toko Anda',
      quantity: parseInt(quantity) || 0,
      price: parseInt(price) || 0,
      originalPrice:
        parseInt(originalPrice) || parseInt(price) * 2 || 0,
      category: category as 'meals' | 'bakery' | 'drinks' | 'snacks',
      notes: notes || undefined,
    });
    navigate('/seller');
  };

  return (
    <div className="size-full flex flex-col bg-[var(--background)] overflow-hidden relative max-w-md mx-auto min-h-[100dvh] shadow-xl">
      {/* Header */}
      <header className="bg-[var(--primary)] text-white px-4 py-4 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/seller')}
            className="p-1 -ml-1 hover:bg-white/20 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Tambah Produk</h1>
        </div>
      </header>

      {/* Form */}
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nama Produk */}
          <div className="space-y-2">
            <label htmlFor="productName" className="text-sm font-medium text-gray-700">
              Nama Produk <span className="text-[var(--destructive)]">*</span>
            </label>
            <Input
              id="productName"
              type="text"
              placeholder="Contoh: Roti Coklat"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>

          {/* Kategori */}
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium text-gray-700">
              Kategori <span className="text-[var(--destructive)]">*</span>
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex h-9 w-full min-w-0 rounded-md border border-input bg-input-background px-3 py-1 text-base transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm"
            >
              {CATEGORIES.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Jumlah Sisa */}
          <div className="space-y-2">
            <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
              Jumlah Sisa <span className="text-[var(--destructive)]">*</span>
            </label>
            <Input
              id="quantity"
              type="number"
              placeholder="8"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="0"
            />
          </div>

          {/* Harga Diskon */}
          <div className="space-y-2">
            <label htmlFor="price" className="text-sm font-medium text-gray-700">
              Harga Diskon (per pcs) <span className="text-[var(--destructive)]">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-medium">
                Rp
              </span>
              <Input
                id="price"
                type="number"
                placeholder="3.000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="pl-10"
                min="0"
              />
            </div>
          </div>

          {/* Harga Normal (opsional) */}
          <div className="space-y-2">
            <label htmlFor="originalPrice" className="text-sm font-medium text-gray-700">
              Harga Normal (per pcs) <span className="text-gray-400 font-normal">— opsional</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-medium">
                Rp
              </span>
              <Input
                id="originalPrice"
                type="number"
                placeholder={price ? `Auto: ${parseInt(price) * 2}` : '7.500'}
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                className="pl-10"
                min="0"
              />
            </div>
            <p className="text-xs text-gray-400">
              Kosongkan untuk auto 2× harga diskon
            </p>
          </div>

          {/* Catatan */}
          <div className="space-y-2">
            <label htmlFor="notes" className="text-sm font-medium text-gray-700">
              Catatan
            </label>
            <Textarea
              id="notes"
              placeholder="Tanpa bahan pengawet, dipanggang pagi ini"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          {/* Upload Foto — placeholder */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Foto Produk
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-2xl px-4 py-8 flex flex-col items-center justify-center text-gray-400 bg-gray-50">
              <Camera className="w-8 h-8 mb-2" />
              <span className="text-sm">Foto placeholder akan digunakan</span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[var(--primary)] text-white font-semibold py-4 rounded-2xl hover:bg-[var(--primary)]/90 transition-colors shadow-sm"
          >
            Upload Produk
          </button>
        </form>
      </div>
    </div>
  );
}
