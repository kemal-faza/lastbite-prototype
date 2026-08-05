# LastBite

LastBite mempertemukan mitra yang memiliki sisa stok makanan dengan pembeli yang mencari pilihan makan lebih murah tapi tetap layak. Lewat transaksi ini, food waste ikut ditekan. Proyek ini dibuat untuk memenuhi tugas mata kuliah Interaksi Manusia dan Komputer di Departemen Informatika UNDIP 2026.

## Fitur

- **Explore**: cari makanan surplus terdekat dengan harga diskon
- **Detail Produk**: lihat informasi lengkap, ulasan, dan label kebersihan
- **Keranjang**: atur jumlah pesanan, lihat ringkasan pembayaran
- **Dashboard Penjual**: kelola stok dan unggah makanan surplus
- **Konfirmasi Pesanan**: kode pickup dan timer pengambilan

## Tech Stack

- React 18 + TypeScript
- Vite 6
- Tailwind CSS 4
- Material UI 7 + shadcn/ui
- React Router 7

## Cara Menjalankan

```bash
npm install
npm run dev
```

Buka `http://localhost:5173/` di browser.

## Halaman yang Tersedia

| Route | Halaman |
|-------|---------|
| `/` | Beranda |
| `/product/:id` | Detail Produk |
| `/cart` | Keranjang |
| `/order/confirm/:id` | Konfirmasi Pesanan |
| `/seller` | Dashboard Penjual |
| `/seller/add` | Tambah Produk |
| `/orders` | Pesanan Saya |
| `/search` | Pencarian |
| `/profile` | Profil |

## Skema Warna

| Peran | Warna |
|-------|-------|
| Primary | `#11676a` |
| Secondary | `#dda63a` |
| Background | `#e4dcca` |
| Danger | `#c2382e` |
