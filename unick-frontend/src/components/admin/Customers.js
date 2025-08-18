import { useEffect, useState } from 'react';
import Loading from '../common/Loading';
import { customersAPI } from '../../services/customers';

export default function Customers() {
	const [loading, setLoading] = useState(true);
	const [customers, setCustomers] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const res = await customersAPI.getAll({ per_page: 50 });
				setCustomers(res.data.data || res.data || []);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	if (loading) return <Loading />;

	return (
		<div className="card">
			<h3>Customers</h3>
			<table width="100%">
				<thead>
					<tr>
						<th align="left">Name</th>
						<th align="left">Email</th>
						<th align="left">Phone</th>
					</tr>
				</thead>
				<tbody>
					{customers.map((c) => (
						<tr key={c.id}>
							<td>{c.user?.name || c.name}</td>
							<td>{c.user?.email}</td>
							<td>{c.user?.phone || c.phone || '-'}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

