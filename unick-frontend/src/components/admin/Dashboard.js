import { useEffect, useState } from 'react';
import { inventoryAPI, ordersAPI } from '../../services/api';
import Loading from '../common/Loading';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Tooltip, Legend } from 'chart.js';
import { listenNotifications } from '../../services/realtime';
import { toast } from 'react-toastify';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Tooltip, Legend);

export default function Dashboard() {
	const [loading, setLoading] = useState(true);
	const [lowStock, setLowStock] = useState({ raw_materials: [], products: [] });
	const [recentOrders, setRecentOrders] = useState([]);
	const [totals, setTotals] = useState({ total_orders: 0, active_orders: 0, inventory_items: 0, customers: 0 });
	const [charts, setCharts] = useState({ monthly_production_output: {}, top_selling_products: [], sales_trend: {} });

	useEffect(() => {
		(async () => {
			try {
				const [ls, orders, overview] = await Promise.all([
					inventoryAPI.getLowStock(),
					ordersAPI.getAll({ per_page: 5 }),
					fetch((process.env.REACT_APP_API_URL || 'http://localhost:8000/api') + '/dashboard/overview', { headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` } }).then(r => r.json())
				]);
				setLowStock(ls.data);
				setRecentOrders(orders.data.data || []);
				setTotals(overview.totals || {});
				setCharts(overview.charts || {});
			} finally {
				setLoading(false);
			}
		})();

		// realtime notifications
		listenNotifications((evt) => {
			if (evt.type === 'new-order') {
				toast.info('New order received');
				ordersAPI.getAll({ per_page: 5 }).then((res) => setRecentOrders(res.data.data || []));
			}
			if (evt.type === 'low-stock') {
				toast.warn(`Low stock: ${evt.data?.name}`);
				inventoryAPI.getLowStock().then((ls) => setLowStock(ls.data));
			}
		});
	}, []);

	if (loading) return <Loading />;

	const prodLabels = Object.keys(charts.monthly_production_output || {});
	const prodData = Object.values(charts.monthly_production_output || {});
	const salesLabels = Object.keys(charts.sales_trend || {});
	const salesData = Object.values(charts.sales_trend || {});
	const pieLabels = (charts.top_selling_products || []).map(p => p.product_name);
	const pieData = (charts.top_selling_products || []).map(p => p.total_quantity);

	return (
		<div className="container-fluid">
			<div className="row mb-3">
				<div className="col-md-3 mb-3"><div className="card p-3"><div className="fw-bold">Total Orders</div><div className="fs-4">{totals.total_orders}</div></div></div>
				<div className="col-md-3 mb-3"><div className="card p-3"><div className="fw-bold">Active Orders</div><div className="fs-4">{totals.active_orders}</div></div></div>
				<div className="col-md-3 mb-3"><div className="card p-3"><div className="fw-bold">Inventory Items</div><div className="fs-4">{totals.inventory_items}</div></div></div>
				<div className="col-md-3 mb-3"><div className="card p-3"><div className="fw-bold">Customers</div><div className="fs-4">{totals.customers}</div></div></div>
			</div>

			<div className="row mb-3">
				<div className="col-lg-6 mb-3"><div className="card p-3"><div className="fw-bold mb-2">Monthly Production Output</div><Bar data={{ labels: prodLabels, datasets: [{ label: 'Units', backgroundColor: '#8a5b2a', data: prodData }] }} options={{ responsive: true, plugins: { legend: { display: false } } }} /></div></div>
				<div className="col-lg-3 mb-3"><div className="card p-3"><div className="fw-bold mb-2">Top Selling Products</div><Pie data={{ labels: pieLabels, datasets: [{ data: pieData, backgroundColor: ['#8a5b2a','#a7743f','#c58b51','#e0a86b','#f2c48a'] }] }} options={{ responsive: true }} /></div></div>
				<div className="col-lg-3 mb-3"><div className="card p-3"><div className="fw-bold mb-2">Low Stock Alerts</div><ul className="mb-0">
					{(lowStock.raw_materials || []).slice(0,5).map((m) => (<li key={m.id}>{m.name}: {m.current_stock}/{m.minimum_stock}</li>))}
				</ul></div></div>
			</div>

			<div className="row mb-3">
				<div className="col-lg-8 mb-3"><div className="card p-3"><div className="fw-bold mb-2">Sales Trend</div><Line data={{ labels: salesLabels, datasets: [{ label: 'Sales', data: salesData, borderColor: '#8a5b2a', backgroundColor: 'rgba(138,91,42,0.2)' }] }} options={{ responsive: true }} /></div></div>
				<div className="col-lg-4 mb-3"><div className="card p-3"><div className="fw-bold mb-2">Recent Orders</div>
					<table className="table table-sm mb-0">
						<thead><tr><th>Order #</th><th>Status</th><th className="text-end">Total</th></tr></thead>
						<tbody>
							{recentOrders.map((o) => (
								<tr key={o.id}><td>#{o.order_number}</td><td>{o.status}</td><td className="text-end">{Number(o.total_amount).toFixed(2)}</td></tr>
							))}
						</tbody>
					</table>
				</div></div>
			</div>
		</div>
	);
}

