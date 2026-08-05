import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { OrderProvider } from './context/OrderContext';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <OrderProvider>
          <RouterProvider router={router} />
          <Toaster position="top-center" closeButton richColors />
        </OrderProvider>
      </WishlistProvider>
    </CartProvider>
  );
}