import { useEffect, useState } from 'react';
import { reportsAPI } from '../../services/api';
import Loading from '../common/Loading';

export default function Reports() {
	const [loading, setLoading] = useState(true);
	const [sales, setSales] = useState({ total_sales: 0, total_orders: 0, top_products: [] });

	useEffect(() => {
		(async () => {
			try {
				const res = await reportsAPI.getSales({});
				setSales(res.data);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	if (loading) return <Loading />;

	return (
		<div className="grid grid-cols-2" style={{ gap: 16 }}>
			<div className="card">
				<h3>Sales KPIs</h3>
				<p>Total Sales: {Number(sales.total_sales || 0).toFixed(2)}</p>
				<p>Total Orders: {sales.total_orders || 0}</p>
			</div>
			<div className="card">
				<h3>Top Products</h3>
				<ul>
					{(sales.top_products || []).map((p) => (
						<li key={p.product_id}>{p.product_name} — {p.total_quantity}</li>
					))}
				</ul>
			</div>
		</div>
	);
}

