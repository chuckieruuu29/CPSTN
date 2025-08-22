import { useEffect, useState } from "react";
import { ordersAPI } from '../../services/api';

export default function Cart({ setCartCount }) {
  const [cart, setCart] = useState({});

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart") || "{}");
    setCart(saved);
  }, []);

  const remove = (id) => {
    let c = { ...cart };
    delete c[id];
    setCart(c);
    localStorage.setItem("cart", JSON.stringify(c));
    setCartCount(Object.values(c).reduce((a, b) => a + b, 0));
  };

  const checkout = async () => {
    const items = Object.entries(cart).map(([product_id, quantity]) => ({
      product_id,
      quantity,
    }));
    if (!items.length) return;
    await ordersAPI.create({ items });
    setCart({});
    localStorage.setItem("cart", "{}");
    setCartCount(0);
    alert("Order placed successfully!");
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {Object.keys(cart).length === 0 && <p>No items in cart.</p>}
      <ul>
        {Object.entries(cart).map(([id, qty]) => (
          <li key={id} style={{ marginBottom: 8 }}>
            Product #{id} — Qty: {qty}{" "}
            <button onClick={() => remove(id)}>Remove</button>
          </li>
        ))}
      </ul>
      <button className="btn btn-success" disabled={!Object.keys(cart).length} onClick={checkout}>
        Checkout
      </button>
    </div>
  );
}





















