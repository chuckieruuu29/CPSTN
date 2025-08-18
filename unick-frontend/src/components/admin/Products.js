import { useEffect, useState } from 'react';
import Loading from '../common/Loading';
import { productsAPI } from '../../services/api';

export default function Products() {
	const [loading, setLoading] = useState(true);
	const [products, setProducts] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const res = await productsAPI.getAll({ per_page: 100 });
				setProducts(res.data.data || []);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	if (loading) return <Loading />;

	return (
		<div className="card">
			<h3>Products</h3>
			<div className="grid grid-cols-3" style={{ gap: 12 }}>
				{products.map((p) => (
					<div className="card" key={p.id}>
						<div style={{ fontWeight: 600 }}>{p.name}</div>
						<div style={{ color: 'var(--text-muted)' }}>₱ {Number(p.price).toFixed(2)}</div>
						<div style={{ marginTop: 6 }}>Stock: {p.current_stock}</div>
					</div>
				))}
			</div>
		</div>
	);
}

