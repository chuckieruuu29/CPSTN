import { useEffect, useState } from 'react';
import Loading from '../common/Loading';
import { productsAPI } from '../../services/api';
import { forecastingAPI } from '../../services/forecasting';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend);

export default function Forecasting() {
	const [loading, setLoading] = useState(true);
	const [products, setProducts] = useState([]);
	const [selected, setSelected] = useState(null);
	const [forecasts, setForecasts] = useState([]);
	const [days, setDays] = useState(30);

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

	const runForecast = async () => {
		if (!selected) return;
		setLoading(true);
		try {
			const res = await forecastingAPI.generate({ type: 'product', item_id: selected, days_ahead: days });
			setForecasts(res.data || []);
		} finally {
			setLoading(false);
		}
	};

	if (loading) return <Loading />;

	return (
		<div className="card p-3">
			<h3>Forecasting</h3>
			<div style={{ display: 'flex', gap: 8, margin: '12px 0' }}>
				<select value={selected || ''} onChange={(e) => setSelected(e.target.value)}>
					<option value="">Select product</option>
					{products.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
				</select>
				<input type="number" min={1} max={365} value={days} onChange={(e) => setDays(Number(e.target.value))} style={{ width: 120 }} />
				<button className="btn btn-primary" onClick={runForecast} disabled={!selected}>Generate</button>
			</div>
			{forecasts.length > 0 && (
				<div className="row">
					<div className="col-md-8 mb-3">
						<div className="card p-3">
							<div className="fw-bold mb-2">Inventory Forecast</div>
							<Line data={{ labels: forecasts.map(f=>f.forecast_date), datasets: [{ label: 'Predicted', data: forecasts.map(f=>f.predicted_demand || f.predicted_consumption), borderColor: '#8a5b2a', backgroundColor: 'rgba(138,91,42,0.2)' }] }} />
						</div>
					</div>
					<div className="col-md-4 mb-3">
						<div className="card p-3">
							<div className="fw-bold mb-2">Replenishment</div>
							<table className="table table-sm mb-0">
								<thead><tr><th>Date</th><th className="text-end">Reorder</th></tr></thead>
								<tbody>
									{forecasts.slice(0,10).map((f) => (
										<tr key={f.id || f.forecast_date}><td>{f.forecast_date}</td><td className="text-end">{f.recommended_reorder_quantity}</td></tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
					<div className="col-md-6 mb-3">
						<div className="card p-3">
							<div className="fw-bold mb-2">Sales Forecast (Next 3 Months)</div>
							<Bar data={{ labels: forecasts.slice(0,3).map(f=>f.forecast_date.slice(0,7)), datasets: [{ label: 'Sales', backgroundColor: '#a7743f', data: forecasts.slice(0,3).map(f=>f.predicted_demand || f.predicted_consumption) }] }} />
						</div>
					</div>
					<div className="col-md-6 mb-3">
						<div className="card p-3">
							<div className="fw-bold mb-2">Production Capacity Planning</div>
							<Bar data={{ labels: ['Cutting','Assembly','Finishing','QA'], datasets: [{ label: '% Utilization', backgroundColor: '#c58b51', data: [60,70,50,65] }] }} options={{ scales: { y: { suggestedMax: 100 } } }} />
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

