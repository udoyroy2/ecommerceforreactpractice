import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./assets/pages/Home";
import CategoryPage from "./assets/pages/CategoryPage";
import About from "./assets/pages/About";
import Contact from "./assets/pages/Contact";
import PrivacyPolicy from "./assets/pages/PrivacyPolicy";
import RefundExchange from "./assets/pages/RefundExchange";
import Terms from "./assets/pages/Terms";
import Register from "./assets/pages/Register";
import Login from "./assets/pages/Login";
import Profile from "./assets/pages/Profile";
import ProductDetails from "./assets/pages/ProductDetails";
import Checkout from "./assets/pages/Checkout";
import OrderSuccess from "./assets/pages/OrderSuccess";
import Cart from "./assets/pages/Cart";
import SearchResults from "./assets/pages/SearchResults";
import AdminDashboard from "./assets/pages/AdminDashboard";
import PaymentFailed from "./assets/pages/PaymentFailed";


export const App = () => {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-exchange" element={<RefundExchange />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;