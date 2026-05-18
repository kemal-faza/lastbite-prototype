import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { RouterProvider } from 'react-router';
import { router } from './routes';

export default function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <RouterProvider router={router} />
      </WishlistProvider>
    </CartProvider>
  );
}