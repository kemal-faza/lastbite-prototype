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