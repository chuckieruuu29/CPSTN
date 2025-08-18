import { useEffect, useState } from 'react';
import { inventoryAPI, ordersAPI } from '../../services/api';
import Loading from '../common/Loading';

export default function Dashboard() {
	const [loading, setLoading] = useState(true);
	const [lowStock, setLowStock] = useState({ raw_materials: [], products: [] });
	const [recentOrders, setRecentOrders] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const [ls, orders] = await Promise.all([
					inventoryAPI.getLowStock(),
					ordersAPI.getAll({ per_page: 5 })
				]);
				setLowStock(ls.data);
				setRecentOrders(orders.data.data || []);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	if (loading) return <Loading />;

	return (
		<div className="grid grid-cols-3" style={{ gap: 16 }}>
			<div className="card">
				<h3>Monthly Production Output</h3>
				<p className="text-muted">Charts placeholder</p>
			</div>
			<div className="card">
				<h3>Top Selling Products</h3>
				<ul>
					{(lowStock.products || []).slice(0,5).map((p) => (
						<li key={p.id}>{p.name} — Stock: {p.current_stock}</li>
					))}
				</ul>
			</div>
			<div className="card">
				<h3>Low Stock Alert</h3>
				<ul>
					{(lowStock.raw_materials || []).slice(0,5).map((m) => (
						<li key={m.id}>{m.name}: {m.current_stock}/{m.minimum_stock}</li>
					))}
				</ul>
			</div>

			<div className="card" style={{ gridColumn: '1/-1' }}>
				<h3>Recent Orders</h3>
				<div className="table">
					<table width="100%">
						<thead>
							<tr>
								<th align="left">Order #</th>
								<th align="left">Status</th>
								<th align="right">Total</th>
							</tr>
						</thead>
						<tbody>
							{recentOrders.map((o) => (
								<tr key={o.id}>
									<td>#{o.order_number}</td>
									<td>{o.status}</td>
									<td align="right">{Number(o.total_amount).toFixed(2)}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

