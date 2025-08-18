import { useEffect, useState } from 'react';
import Loading from '../common/Loading';
import { ordersAPI } from '../../services/api';

export default function Orders() {
	const [loading, setLoading] = useState(true);
	const [orders, setOrders] = useState([]);

	const load = async () => {
		setLoading(true);
		try {
			const res = await ordersAPI.getAll({ per_page: 20 });
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
		<div className="card">
			<h3>Orders</h3>
			<table width="100%">
				<thead>
					<tr>
						<th align="left">Order #</th>
						<th align="left">Customer</th>
						<th align="left">Status</th>
						<th align="right">Total</th>
						<th align="right">Actions</th>
					</tr>
				</thead>
				<tbody>
					{orders.map((o) => (
						<tr key={o.id}>
							<td>#{o.order_number}</td>
							<td>{o.customer?.user?.name}</td>
							<td>{o.status}</td>
							<td align="right">{Number(o.total_amount).toFixed(2)}</td>
							<td align="right">
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

