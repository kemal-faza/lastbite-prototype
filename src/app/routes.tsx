import { createBrowserRouter } from "react-router";
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./pages/Home";
import { Search } from "./pages/Search";
import { Cart } from "./pages/Cart";
import { Profile } from "./pages/Profile";
import { DetailProduct } from "./pages/DetailProduct";
import { Confirmation } from "./pages/Confirmation";
import { Orders } from "./pages/Orders";
import { Wishlist } from "./pages/Wishlist";
import { SellerDashboard } from "./pages/SellerDashboard";
import { AddProduct } from "./pages/AddProduct";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: "search", Component: Search },
      { path: "cart", Component: Cart },
      { path: "orders", Component: Orders },
      { path: "profile", Component: Profile },
      { path: "product/:id", Component: DetailProduct },
      { path: "order/confirm/:id", Component: Confirmation },
      { path: "wishlist", Component: Wishlist },
    ],
  },
  { path: "/seller", Component: SellerDashboard },
  { path: "/seller/add", Component: AddProduct },
]);
