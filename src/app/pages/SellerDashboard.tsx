import { ArrowLeft, Store, Package, Plus, Pencil, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import {
  getSellerProducts,
  updateSellerProduct,
  deleteSellerProduct,
  toggleProductActive,
  type SellerProduct,
} from '../data/sellerProducts';
import { Switch } from '../components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { Input } from '../components/ui/input';

export function SellerDashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<SellerProduct[]>([]);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [editing, setEditing] = useState<SellerProduct | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    quantity: 0,
    price: 0,
    originalPrice: 0,
    category: '' as string,
  });

  useEffect(() => {
    setProducts(getSellerProducts());
  }, []);

  const refresh = () => setProducts(getSellerProducts());

  const totalStock = products.reduce((sum, p) => sum + p.quantity, 0);
  const remaining = products.reduce((sum, p) => sum + p.quantity, 0);

  const handleDelete = (id: string) => {
    deleteSellerProduct(id);
    setDeleteConfirm(null);
    refresh();
  };

  const handleToggle = (id: string) => {
    toggleProductActive(id);
    refresh();
  };

  const openEdit = (product: SellerProduct) => {
    setEditing(product);
    setEditForm({
      name: product.name,
      quantity: product.quantity,
      price: product.price,
      originalPrice: product.originalPrice,
      category: product.category,
    });
  };

  const saveEdit = () => {
    if (!editing) return;
    updateSellerProduct(editing.id, {
      name: editForm.name,
      quantity: editForm.quantity,
      price: editForm.price,
      originalPrice: editForm.originalPrice,
      category: editForm.category as SellerProduct['category'],
    });
    setEditing(null);
    refresh();
  };

  return (
    <div className="size-full flex flex-col bg-[var(--background)] overflow-hidden relative max-w-md mx-auto min-h-[100dvh] shadow-xl">
      {/* Header */}
      <header className="bg-[var(--primary)] text-white px-4 py-4 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/profile')}
            className="p-1.5 -ml-1.5 hover:bg-white/20 rounded-xl transition-all flex items-center justify-center text-white"
            aria-label="Kembali ke Mode Pembeli"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="flex-1 text-base font-bold text-center">Dashboard Seller</h1>
          <Store className="w-5 h-5 text-white/80" />
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-28 space-y-6">
        {/* Ringkasan */}
        <section>
          <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">
            Ringkasan Hari Ini
          </h2>
          <div className="flex gap-3">
            <div className="flex-1 bg-white rounded-2xl shadow-sm px-4 py-5 text-center">
              <p className="text-2xl font-bold text-[var(--primary)]">
                {totalStock}
              </p>
              <p className="text-xs text-gray-500 mt-1">Total Stok</p>
            </div>
            <div className="flex-1 bg-white rounded-2xl shadow-sm px-4 py-5 text-center">
              <p className="text-2xl font-bold text-[var(--secondary)]">
                {products.length}
              </p>
              <p className="text-xs text-gray-500 mt-1">Produk Aktif</p>
            </div>
            <div className="flex-1 bg-white rounded-2xl shadow-sm px-4 py-5 text-center">
              <p className="text-2xl font-bold text-[var(--destructive)]">
                {remaining}
              </p>
              <p className="text-xs text-gray-500 mt-1">Total Stok</p>
            </div>
          </div>
        </section>

        {/* Info Mitra */}
        <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-4 border border-green-100">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
              <Store className="w-5 h-5 text-green-700" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">Mitra LastBite</h3>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Kamu tidak dikenakan biaya platform. Biaya layanan ditanggung
                sepenuhnya oleh LastBite sebagai bentuk dukungan untuk mitra
                mengurangi food waste.
              </p>
            </div>
          </div>
        </div>

        {/* Produk */}
        <section>
          <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">
            Produk Hari Ini
          </h2>
          {products.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <Package className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p className="text-sm">Belum ada produk. Tambahkan produk pertamamu!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {products.map((product) => (
                <div
                  key={product.id}
                  className={`bg-white rounded-2xl shadow-sm px-4 py-4 transition-opacity ${
                    !product.active ? 'opacity-60' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center">
                        <Package className="w-5 h-5 text-[var(--primary)]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{product.name}</h3>
                        <p className="text-sm text-gray-500">
                          {product.quantity} pcs | Rp{product.price.toLocaleString('id-ID')}
                          {!product.active && (
                            <span className="ml-2 text-xs bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full">
                              Nonaktif
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <Switch
                          checked={product.active}
                          onCheckedChange={() => handleToggle(product.id)}
                        />
                        <span className="text-xs text-gray-500">
                          {product.active ? 'Aktif' : 'Nonaktif'}
                        </span>
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEdit(product)}
                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
                        aria-label="Edit produk"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(product.id)}
                        className="p-2 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-500 transition-colors"
                        aria-label="Hapus produk"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* FAB */}
      <button
        onClick={() => navigate('/seller/add')}
        className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-[var(--primary)] text-white shadow-lg flex items-center justify-center hover:bg-[var(--primary)]/90 transition-colors z-50"
      >
        <Plus className="w-7 h-7" />
      </button>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirm !== null} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Produk</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600">
            Yakin ingin menghapus produk ini? Tindakan ini tidak bisa dibatalkan.
          </p>
          <div className="flex gap-3 justify-end mt-4">
            <button
              onClick={() => setDeleteConfirm(null)}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Batal
            </button>
            <button
              onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
              className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Hapus
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editing !== null} onOpenChange={() => setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Produk</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Nama Produk</label>
              <Input
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Kategori</label>
              <select
                value={editForm.category}
                onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                className="flex h-9 w-full rounded-md border border-input bg-input-background px-3 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              >
                <option value="meals">Makanan Berat</option>
                <option value="bakery">Roti & Kue</option>
                <option value="drinks">Minuman</option>
                <option value="snacks">Cemilan</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Jumlah Stok</label>
              <Input
                type="number"
                value={editForm.quantity}
                onChange={(e) =>
                  setEditForm({ ...editForm, quantity: parseInt(e.target.value) || 0 })
                }
                min="0"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Harga Diskon (Rp)</label>
              <Input
                type="number"
                value={editForm.price}
                onChange={(e) =>
                  setEditForm({ ...editForm, price: parseInt(e.target.value) || 0 })
                }
                min="0"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Harga Normal (Rp)</label>
              <Input
                type="number"
                value={editForm.originalPrice}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    originalPrice: parseInt(e.target.value) || 0,
                  })
                }
                min="0"
              />
            </div>
          </div>
          <div className="flex gap-3 justify-end mt-4">
            <button
              onClick={() => setEditing(null)}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Batal
            </button>
            <button
              onClick={saveEdit}
              className="px-4 py-2 text-sm font-medium bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary)]/90 transition-colors"
            >
              Simpan
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
