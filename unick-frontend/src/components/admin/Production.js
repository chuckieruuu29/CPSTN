import { useEffect, useState } from 'react';
import { productionAPI } from '../../services/api';
import Loading from '../common/Loading';

export default function Production() {
	const [loading, setLoading] = useState(true);
	const [batches, setBatches] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const res = await productionAPI.getBatches({ per_page: 20 });
				setBatches(res.data.data || res.data || []);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	if (loading) return <Loading />;

	return (
		<div className="card p-3">
			<h3 className="mb-3">Production Tracking</h3>
			<table className="table">
				<thead>
					<tr>
						<th>Batch</th>
						<th>Order #</th>
						<th>Status</th>
						<th>Progress</th>
						<th>Start</th>
						<th>End</th>
					</tr>
				</thead>
				<tbody>
					{batches.map((b) => (
						<tr key={b.id}>
							<td>{b.batch_number}</td>
							<td>{b.order?.order_number}</td>
							<td><span className="badge text-bg-secondary">{b.status}</span></td>
							<td style={{ width: 200 }}>
								<div className="progress" role="progressbar" aria-valuenow={b.progress || 0} aria-valuemin="0" aria-valuemax="100">
									<div className="progress-bar" style={{ width: `${b.progress || 0}%`, backgroundColor: '#8a5b2a' }}></div>
								</div>
							</td>
							<td>{b.start_date || '-'}</td>
							<td>{b.end_date || '-'}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

