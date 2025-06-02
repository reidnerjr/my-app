import { Routes, Route } from 'react-router-dom';
import Cart from '../pages/Cart';
import Home from '../pages/Home';
import ProductDetail from '../pages/ProductDetail';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/product/:id" element={<ProductDetail />} />
    </Routes>
  );
}