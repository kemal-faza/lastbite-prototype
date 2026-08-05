export const STORAGE_KEY = 'lastbite-seller-products-v2';

let idCounter = 0;

export function generateSellerId(): string {
  return `seller-${Date.now()}-${++idCounter}`;
}

export interface SellerProduct {
  id: string;
  name: string;
  store: string;
  quantity: number;
  price: number;
  originalPrice: number;
  category: 'meals' | 'bakery' | 'drinks' | 'snacks';
  notes?: string;
  image: string;
  active: boolean;
  createdAt: number;
  /** Optional display metadata inherited from the seed catalog */
  expiresIn?: string;
  distance?: string;
}

function readAll(): SellerProduct[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    // Key doesn't exist at all = first visit → seed demo products
    if (raw === null) {
      const seeded: SellerProduct[] = SEED_DATA.map((p, i) => ({
        ...p,
        id: `seed-${i + 1}`,
        notes: undefined,
        createdAt: Date.now(),
      }));
      writeAll(seeded);
      return seeded;
    }
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

function writeAll(products: SellerProduct[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

type SeedProduct = Omit<SellerProduct, 'id' | 'notes' | 'createdAt'>;

const SEED_DATA: SeedProduct[] = [
  {
    name: 'Ayam Preksu',
    store: 'Preksu Geprek',
    quantity: 5,
    price: 8000,
    originalPrice: 16000,
    category: 'meals',
    image: '/assets/products/ayam_geprek.png',
    active: true,
    expiresIn: '2 jam',
    distance: '120m',
  },
  {
    name: 'Nasi Padang',
    store: 'RM Sederhana',
    quantity: 3,
    price: 10000,
    originalPrice: 18000,
    category: 'meals',
    image: '/assets/products/nasi_padang.png',
    active: true,
    expiresIn: '1 jam',
    distance: '200m',
  },
  {
    name: 'Roti Coklat',
    store: 'Roti Ibu Tutik',
    quantity: 8,
    price: 3000,
    originalPrice: 7500,
    category: 'bakery',
    image: '/assets/products/bakery_surplus.png',
    active: true,
    expiresIn: '4 jam',
    distance: '650m',
  },
  {
    name: 'Kopi Susu Gula Aren',
    store: 'Kopiku',
    quantity: 10,
    price: 8000,
    originalPrice: 15000,
    category: 'drinks',
    image: '/assets/products/kopi_susu.png',
    active: true,
    expiresIn: '3 jam',
    distance: '150m',
  },
  {
    name: 'Nasi Goreng Kampung',
    store: 'Warung Bu Ani',
    quantity: 4,
    price: 12000,
    originalPrice: 20000,
    category: 'meals',
    image: '/assets/products/nasi_goreng.png',
    active: true,
    expiresIn: '2 jam',
    distance: '720m',
  },
  {
    name: 'Roti Keju',
    store: 'Roti Ibu Tutik',
    quantity: 6,
    price: 3500,
    originalPrice: 8000,
    category: 'bakery',
    image: '/assets/products/bakery_surplus.png',
    active: true,
    expiresIn: '5 jam',
    distance: '1.2km',
  },
  {
    name: 'Es Teh Tarik',
    store: 'Teh Nusantara',
    quantity: 7,
    price: 5000,
    originalPrice: 10000,
    category: 'drinks',
    image: '/assets/products/kopi_susu.png',
    active: true,
    expiresIn: '2 jam',
    distance: '100m',
  },
  {
    name: 'Mie Ayam Komplit',
    store: 'Mie Ayam Pakde',
    quantity: 2,
    price: 10000,
    originalPrice: 15000,
    category: 'meals',
    image: '/assets/products/mie_ayam.png',
    active: true,
    expiresIn: '1 jam',
    distance: '850m',
  },
  {
    name: 'Pisang Goreng Kriuk',
    store: 'Warung Bu Ani',
    quantity: 6,
    price: 5000,
    originalPrice: 10000,
    category: 'snacks',
    image: '/assets/products/nasi_goreng.png',
    active: true,
    expiresIn: '1 jam',
    distance: '300m',
  },
  {
    name: 'Nasi Kuning Komplit',
    store: 'Warung Bu Ani',
    quantity: 4,
    price: 10000,
    originalPrice: 18000,
    category: 'meals',
    image: '/assets/products/nasi_goreng.png',
    active: true,
    expiresIn: '2 jam',
    distance: '720m',
  },
  {
    name: 'Kopi Hitam',
    store: 'Kopiku',
    quantity: 10,
    price: 4000,
    originalPrice: 8000,
    category: 'drinks',
    image: '/assets/products/kopi_susu.png',
    active: true,
    expiresIn: '3 jam',
    distance: '150m',
  },
  {
    name: 'Matcha Latte',
    store: 'Kopiku',
    quantity: 5,
    price: 10000,
    originalPrice: 18000,
    category: 'drinks',
    image: '/assets/products/kopi_susu.png',
    active: true,
    expiresIn: '3 jam',
    distance: '150m',
  },
  {
    name: 'Dimsum Ayam',
    store: 'Preksu Geprek',
    quantity: 7,
    price: 8000,
    originalPrice: 15000,
    category: 'snacks',
    image: '/assets/products/ayam_geprek.png',
    active: false,
    expiresIn: '2 jam',
    distance: '120m',
  },
  {
    name: 'Sate Padang',
    store: 'RM Sederhana',
    quantity: 3,
    price: 12000,
    originalPrice: 20000,
    category: 'meals',
    image: '/assets/products/nasi_padang.png',
    active: true,
    expiresIn: '1 jam',
    distance: '200m',
  },
  {
    name: 'Roti Pisang',
    store: 'Roti Ibu Tutik',
    quantity: 5,
    price: 3000,
    originalPrice: 7000,
    category: 'bakery',
    image: '/assets/products/bakery_surplus.png',
    active: true,
    expiresIn: '4 jam',
    distance: '650m',
  },
  {
    name: 'Mie Goreng',
    store: 'Mie Ayam Pakde',
    quantity: 4,
    price: 7000,
    originalPrice: 12000,
    category: 'meals',
    image: '/assets/products/mie_ayam.png',
    active: true,
    expiresIn: '2 jam',
    distance: '850m',
  },
];

export function getSellerProducts(): SellerProduct[] {
  return readAll();
}

export function addSellerProduct(
  input: Pick<
    SellerProduct,
    'name' | 'store' | 'quantity' | 'price' | 'originalPrice' | 'category'
  > & { notes?: string },
): void {
  const products = readAll();
  const newProduct: SellerProduct = {
    id: generateSellerId(),
    name: input.name,
    store: input.store,
    quantity: input.quantity,
    price: input.price,
    originalPrice: input.originalPrice,
    category: input.category,
    notes: input.notes,
    image: '',
    active: true,
    createdAt: Date.now(),
  };
  products.push(newProduct);
  writeAll(products);
}

export function updateSellerProduct(
  id: string,
  updates: Partial<SellerProduct>,
): void {
  const products = readAll();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return;
  products[index] = { ...products[index], ...updates };
  writeAll(products);
}

export function deleteSellerProduct(id: string): void {
  const products = readAll().filter((p) => p.id !== id);
  writeAll(products);
}

export function toggleProductActive(id: string): void {
  const products = readAll();
  const product = products.find((p) => p.id === id);
  if (!product) return;
  product.active = !product.active;
  writeAll(products);
}