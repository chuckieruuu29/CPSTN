import { useEffect, useState } from 'react';
import { productsAPI, ordersAPI, authAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function CustomerPortal() {
	const navigate = useNavigate();
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState({});
	const [message, setMessage] = useState('');

	useEffect(() => {
		(async () => {
			try {
				await authAPI.profile();
				const res = await productsAPI.getAll({ per_page: 50 });
				setProducts(res.data.data || []);
			} catch (e) {
				navigate('/login', { replace: true });
			}
		})();
	}, [navigate]);

	const addToCart = (id) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
	const removeFromCart = (id) => setCart((c) => { const n = { ...c }; delete n[id]; return n; });

	const placeOrder = async () => {
		setMessage('');
		const items = Object.entries(cart).map(([product_id, quantity]) => ({ product_id, quantity }));
		if (!items.length) return;
		try {
			const res = await ordersAPI.create({ items });
			setCart({});
			setMessage(`Order placed: #${res.data.order_number}`);
		} catch {
			setMessage('Failed to place order');
		}
	};

	return (
		<div style={{ padding: 16 }}>
			<div className="container">
				{message && <div className="card" style={{ marginBottom: 12 }}><div>{message}</div></div>}
				<div className="grid grid-cols-4">
					{products.map((p) => (
						<div key={p.id} className="card">
							<div className="card-title">{p.name}</div>
							<div style={{ color: '#64748b', marginBottom: 8 }}>{formatCurrency(p.price)}</div>
							<div style={{ display: 'flex', gap: 8 }}>
								{!cart[p.id] && (
									<button className="btn btn-primary" onClick={() => addToCart(p.id)}>Add to Cart</button>
								)}
								{cart[p.id] && (
									<button className="btn btn-secondary" onClick={() => removeFromCart(p.id)}>Remove</button>
								)}
							</div>
						</div>
					))}
				</div>
				<div style={{ marginTop: 16 }}>
					<button className="btn btn-success" onClick={placeOrder} disabled={!Object.keys(cart).length}>Place Order</button>
				</div>
			</div>
		</div>
	);
}

function formatCurrency(value) {
	try { return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(Number(value || 0)); } catch { return `${value}`; }
}