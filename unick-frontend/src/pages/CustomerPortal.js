import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ProductCatalog from "../components/customer/ProductCatalog";
import ProductDetail from "../components/customer/ProductDetails";
import Cart from "../components/customer/Cart";
import OrderTracking from "../components/customer/OrderTracking";

export default function CustomerPortal() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  return (
    <div style={{ minHeight: "100vh", background: "#fdf9f1" }}>
      {/* Top Navbar */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 24px",
          background: "#8a5b2a",
          color: "#fff",
        }}
      >
        <div style={{ fontWeight: "bold", fontSize: 20 }}>
          Unick Enterprises
        </div>
        <nav style={{ display: "flex", gap: 24 }}>
          <Link to="/portal/products" style={{ color: "#fff" }}>
            Products
          </Link>
          <Link to="/portal/orders" style={{ color: "#fff" }}>
            My Orders
          </Link>
          <Link to="/portal/cart" style={{ color: "#fff" }}>
            🛒 Cart ({cartCount})
          </Link>
          <div style={{ cursor: "pointer" }}>👤 Customer ▾</div>
        </nav>
      </header>

      {/* Page Content */}
      <main style={{ padding: 24 }}>
        <Routes>
          <Route path="/products" element={<ProductCatalog setCartCount={setCartCount} />} />
          <Route path="/products/:id" element={<ProductDetail setCartCount={setCartCount} />} />
          <Route path="/cart" element={<Cart setCartCount={setCartCount} />} />
          <Route path="/orders" element={<OrderTracking />} />
        </Routes>
      </main>
    </div>
  );
}
