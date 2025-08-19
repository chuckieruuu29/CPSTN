import { useEffect, useState } from 'react';
import Loading from '../common/Loading';
import { ordersAPI } from '../../services/api';

export default function Orders() {
	const [loading, setLoading] = useState(true);
	const [orders, setOrders] = useState([]);
	const [status, setStatus] = useState('');

	const load = async () => {
		setLoading(true);
		try {
			const params = { per_page: 20 };
			if (status) params.status = status;
			const res = await ordersAPI.getAll(params);
			setOrders(res.data.data || []);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => { load(); }, []);

	const approve = async (id) => {
		await ordersAPI.approve(id);
		await load();
	};

	if (loading) return <Loading />;

	return (
		<div className="card p-3">
			<div className="d-flex align-items-center justify-content-between mb-2">
				<h3 className="mb-0">Orders</h3>
				<div className="d-flex gap-2">
					<select className="form-select" style={{ width: 220 }} value={status} onChange={(e) => setStatus(e.target.value)}>
						<option value="">All Statuses</option>
						<option value="pending">Pending</option>
						<option value="approved">Approved</option>
						<option value="in_production">In Production</option>
						<option value="completed">Completed</option>
						<option value="shipped">Shipped</option>
						<option value="delivered">Delivered</option>
						<option value="cancelled">Cancelled</option>
					</select>
					<button className="btn btn-outline-secondary" onClick={load}>Filter</button>
				</div>
			</div>
			<table className="table">
				<thead>
					<tr>
						<th>Order #</th>
						<th>Customer</th>
						<th>Status</th>
						<th className="text-end">Total</th>
						<th className="text-end">Actions</th>
					</tr>
				</thead>
				<tbody>
					{orders.map((o) => (
						<tr key={o.id}>
							<td>#{o.order_number}</td>
							<td>{o.customer?.user?.name}</td>
							<td><span className="badge text-bg-secondary">{o.status}</span></td>
							<td className="text-end">{Number(o.total_amount).toFixed(2)}</td>
							<td className="text-end">
								{o.status === 'pending' && (
									<button className="btn btn-success" onClick={() => approve(o.id)}>Approve</button>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}