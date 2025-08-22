import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productsAPI } from '../../services/api';

export default function ProductCatalog({ setCartCount }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await productsAPI.getAll({ per_page: 50 });
      setProducts(res.data.data || []);
    })();
  }, []);

  const addToCart = (p) => {
    let cart = JSON.parse(localStorage.getItem("cart") || "{}");
    cart[p.id] = (cart[p.id] || 0) + 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartCount(Object.values(cart).reduce((a, b) => a + b, 0));
  };

  return (
    <div>
      <h2 style={{ marginBottom: 16 }}>Our Woodcraft Collection</h2>
      <div className="grid grid-cols-4 gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-white rounded-xl shadow p-4">
            <Link to={`/portal/products/${p.id}`}>
              <img
                src={p.image || "https://via.placeholder.com/200"}
                alt={p.name}
                style={{ borderRadius: 8, height: 160, width: "100%", objectFit: "cover" }}
              />
            </Link>
            <h4 style={{ fontWeight: 600, marginTop: 8 }}>{p.name}</h4>
            <p style={{ color: "#555" }}>₱ {Number(p.price).toLocaleString()}</p>
            <button
              className="btn btn-primary w-100"
              onClick={() => addToCart(p)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
