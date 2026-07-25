export const STORAGE_KEY = 'lastbite-seller-products';

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
}

function readAll(): SellerProduct[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    // Key doesn't exist at all = first visit → seed demo products
    if (raw === null) {
      const seeded: SellerProduct[] = SEED_DATA.map((p, i) => ({
        ...p,
        id: `seed-${i + 1}`,
        image: '',
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

const SEED_DATA: Array<{
  name: string;
  store: string;
  quantity: number;
  price: number;
  originalPrice: number;
  category: SellerProduct['category'];
  active: boolean;
}> = [
  {
    name: 'Roti Coklat',
    store: 'Roti Ibu Tutik',
    quantity: 8,
    price: 3000,
    originalPrice: 7500,
    category: 'bakery',
    active: true,
  },
  {
    name: 'Nasi Goreng Kampung',
    store: 'Warung Bu Ani',
    quantity: 4,
    price: 12000,
    originalPrice: 20000,
    category: 'meals',
    active: true,
  },
  {
    name: 'Es Teh Tarik',
    store: 'Teh Nusantara',
    quantity: 7,
    price: 5000,
    originalPrice: 10000,
    category: 'drinks',
    active: true,
  },
  {
    name: 'Dimsum Ayam',
    store: 'Preksu Geprek',
    quantity: 5,
    price: 8000,
    originalPrice: 15000,
    category: 'snacks',
    active: false,
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
