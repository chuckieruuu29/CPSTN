import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { productsAPI } from '../../services/api';

export default function ProductDetail({ setCartCount }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await productsAPI.getOne(id);
      setProduct(res.data);
    })();
  }, [id]);

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart") || "{}");
    cart[id] = (cart[id] || 0) + 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartCount(Object.values(cart).reduce((a, b) => a + b, 0));
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h2>{product.name}</h2>
      <img
        src={product.image || "https://via.placeholder.com/400"}
        alt={product.name}
        style={{ borderRadius: 8, maxHeight: 300 }}
      />
      <p>₱ {Number(product.price).toLocaleString()}</p>
      <p>{product.description}</p>
      <button className="btn btn-primary" onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  );
}
