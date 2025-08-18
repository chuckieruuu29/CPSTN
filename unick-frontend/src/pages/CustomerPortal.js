import { useEffect, useState } from 'react';
import { productsAPI, ordersAPI, authAPI } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

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
		<div>
			<header style={{
				display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16,
				background: '#fff', borderBottom: '1px solid var(--border-color)'
			}}>
				<div style={{ fontWeight: 700 }}>Customer Portal</div>
				<Link to="/admin/dashboard" className="btn btn-secondary">Admin</Link>
			</header>
			<div style={{ padding: 16 }}>
				{message && <div className="alert alert-success">{message}</div>}
				<div className="grid grid-cols-3" style={{ gap: 12 }}>
					{products.map((p) => (
						<div className="card" key={p.id}>
							<div style={{ fontWeight: 600 }}>{p.name}</div>
							<div style={{ color: 'var(--text-muted)' }}>₱ {Number(p.price).toFixed(2)}</div>
							<div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
								<button className="btn btn-primary" onClick={() => addToCart(p.id)}>Add</button>
								{cart[p.id] && <button className="btn btn-secondary" onClick={() => removeFromCart(p.id)}>Remove</button>}
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