import { useEffect, useState } from 'react';
import { reportsAPI } from '../../services/api';
import Loading from '../common/Loading';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend);

export default function Reports() {
	const [loading, setLoading] = useState(true);
	const [sales, setSales] = useState({ total_sales: 0, total_orders: 0, top_products: [], sales_by_month: {} });

	useEffect(() => {
		(async () => {
			try {
				const res = await reportsAPI.getSales({});
				setSales(res.data.summary ? { ...res.data.summary } : res.data);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	if (loading) return <Loading />;

	const monthLabels = Object.keys(sales.sales_by_month || {});
	const monthData = Object.values(sales.sales_by_month || {});
	const pieLabels = (sales.top_products || []).map((t) => t.name || t.product_name);
	const pieData = (sales.top_products || []).map((t) => Number(t.total_sales || t.total_quantity));

	const downloadBlob = (blob, filename) => {
		const url = window.URL.createObjectURL(new Blob([blob]));
		const link = document.createElement('a');
		link.href = url; link.setAttribute('download', filename);
		document.body.appendChild(link); link.click(); link.parentNode.removeChild(link);
	};

	const exportPDF = async (type) => {
		const map = {
			inventory: () => reportsAPI.downloadInventory(),
			sales: () => reportsAPI.downloadSales({}),
			production: () => reportsAPI.downloadProduction({}),
		};
		const res = await map[type]();
		downloadBlob(res.data, `${type}-report.pdf`);
	};

	const exportExcel = async (type) => {
		const map = {
			inventory: () => reportsAPI.exportInventory(),
			sales: () => reportsAPI.exportSales({}),
			production: () => reportsAPI.exportProduction({}),
		};
		const res = await map[type]();
		downloadBlob(res.data, `${type}-report.xlsx`);
	};

	return (
		<div className="container-fluid">
			<div className="row mb-3">
				<div className="col-md-4 mb-3">
					<div className="card p-3">
						<h3>Sales KPIs</h3>
						<p>Total Sales: {Number(sales.total_sales || 0).toFixed(2)}</p>
						<p>Total Orders: {sales.total_orders || 0}</p>
						<div className="d-flex gap-2">
							<button className="btn btn-outline-secondary" onClick={() => exportPDF('sales')}>PDF</button>
							<button className="btn btn-outline-secondary" onClick={() => exportExcel('sales')}>Excel</button>
						</div>
					</div>
				</div>
				<div className="col-md-8 mb-3">
					<div className="card p-3">
						<div className="fw-bold mb-2">Monthly Sales Trend</div>
						<Line data={{ labels: monthLabels, datasets: [{ label: 'Sales', data: monthData, borderColor: '#8a5b2a', backgroundColor: 'rgba(138,91,42,0.2)' }] }} />
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-md-6 mb-3">
					<div className="card p-3">
						<div className="fw-bold mb-2">Top Products</div>
						<Pie data={{ labels: pieLabels, datasets: [{ data: pieData, backgroundColor: ['#8a5b2a','#a7743f','#c58b51','#e0a86b','#f2c48a'] }] }} />
					</div>
				</div>
				<div className="col-md-6 mb-3">
					<div className="card p-3">
						<div className="fw-bold mb-2">Exports</div>
						<div className="d-flex gap-2 mb-2">
							<button className="btn btn-outline-secondary" onClick={() => exportPDF('inventory')}>Inventory PDF</button>
							<button className="btn btn-outline-secondary" onClick={() => exportExcel('inventory')}>Inventory Excel</button>
						</div>
						<div className="d-flex gap-2">
							<button className="btn btn-outline-secondary" onClick={() => exportPDF('production')}>Production PDF</button>
							<button className="btn btn-outline-secondary" onClick={() => exportExcel('production')}>Production Excel</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

