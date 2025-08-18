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
		<div className="card">
			<h3>Production Tracking</h3>
			<table width="100%">
				<thead>
					<tr>
						<th align="left">Batch</th>
						<th align="left">Order #</th>
						<th align="left">Status</th>
						<th align="left">Start</th>
						<th align="left">End</th>
					</tr>
				</thead>
				<tbody>
					{batches.map((b) => (
						<tr key={b.id}>
							<td>{b.batch_number}</td>
							<td>{b.order?.order_number}</td>
							<td>{b.status}</td>
							<td>{b.start_date || '-'}</td>
							<td>{b.end_date || '-'}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

