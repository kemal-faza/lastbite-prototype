# LastBite — Solusi Digital Makanan Surplus

Aplikasi mobile yang menghubungkan penjual makanan sisa stok dengan pembeli yang mencari pilihan makan lebih murah, untuk menekan food waste. Dibuat untuk memenuhi tugas mata kuliah Interaksi Manusia dan Komputer — Departemen Informatika UNDIP 2026.

## Fitur

- **Explore** — Cari makanan surplus terdekat dengan harga diskon
- **Detail Produk** — Lihat informasi lengkap, ulasan, dan label kebersihan
- **Keranjang** — Atur jumlah pesanan, lihat ringkasan pembayaran
- **Dashboard Penjual** — Kelola stok dan upload makanan surplus
- **Konfirmasi Pesanan** — Kode pickup dan timer pengambilan

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
