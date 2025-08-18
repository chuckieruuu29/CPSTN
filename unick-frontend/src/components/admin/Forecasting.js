import { useEffect, useState } from 'react';
import Loading from '../common/Loading';
import { productsAPI } from '../../services/api';
import { forecastingAPI } from '../../services/forecasting';

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
		<div className="card">
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
				<table width="100%">
					<thead>
						<tr>
							<th align="left">Date</th>
							<th align="right">Predicted</th>
							<th align="right">Reorder Qty</th>
						</tr>
					</thead>
					<tbody>
						{forecasts.map((f) => (
							<tr key={f.id || f.forecast_date}>
								<td>{f.forecast_date}</td>
								<td align="right">{f.predicted_demand || f.predicted_consumption}</td>
								<td align="right">{f.recommended_reorder_quantity}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}

