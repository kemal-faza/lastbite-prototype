export interface Product {
  id: number;
  name: string;
  store: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  expiresIn: string;
  remaining: number;
  distance: string;
  category: string;
  image: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Ayam Geprek Preksu',
    store: 'Preksu Geprek',
    originalPrice: 16000,
    discountedPrice: 8000,
    discount: 50,
    expiresIn: '2 jam',
    remaining: 5,
    distance: '120m',
    category: 'meals',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop',
  },
  {
    id: 2,
    name: 'Nasi Padang',
    store: 'RM Sederhana',
    originalPrice: 18000,
    discountedPrice: 10000,
    discount: 44,
    expiresIn: '1 jam',
    remaining: 3,
    distance: '200m',
    category: 'meals',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop',
  },
  {
    id: 3,
    name: 'Roti Coklat',
    store: 'Roti Ibu Tutik',
    originalPrice: 7500,
    discountedPrice: 3000,
    discount: 60,
    expiresIn: '4 jam',
    remaining: 8,
    distance: '350m',
    category: 'bakery',
    image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=400&h=300&fit=crop',
  },
  {
    id: 4,
    name: 'Kopi Susu Gula Aren',
    store: 'Kopiku',
    originalPrice: 15000,
    discountedPrice: 8000,
    discount: 47,
    expiresIn: '3 jam',
    remaining: 10,
    distance: '150m',
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop',
  },
  {
    id: 5,
    name: 'Nasi Goreng Kampung',
    store: 'Warung Bu Ani',
    originalPrice: 20000,
    discountedPrice: 12000,
    discount: 40,
    expiresIn: '2 jam',
    remaining: 4,
    distance: '280m',
    category: 'meals',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop',
  },
  {
    id: 6,
    name: 'Roti Keju',
    store: 'Roti Ibu Tutik',
    originalPrice: 8000,
    discountedPrice: 3500,
    discount: 56,
    expiresIn: '5 jam',
    remaining: 6,
    distance: '350m',
    category: 'bakery',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop',
  },
  {
    id: 7,
    name: 'Es Teh Tarik',
    store: 'Teh Nusantara',
    originalPrice: 10000,
    discountedPrice: 5000,
    discount: 50,
    expiresIn: '2 jam',
    remaining: 7,
    distance: '100m',
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop',
  },
  {
    id: 8,
    name: 'Mie Ayam Komplit',
    store: 'Mie Ayam Pakde',
    originalPrice: 15000,
    discountedPrice: 10000,
    discount: 33,
    expiresIn: '1 jam',
    remaining: 2,
    distance: '450m',
    category: 'meals',
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=300&fit=crop',
  },
];