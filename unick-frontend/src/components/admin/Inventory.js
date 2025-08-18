import { useEffect, useState } from 'react';
import { inventoryAPI } from '../../services/api';
import Loading from '../common/Loading';

export default function Inventory() {
	const [loading, setLoading] = useState(true);
	const [materials, setMaterials] = useState([]);
	const [products, setProducts] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const [rm, pr] = await Promise.all([
					inventoryAPI.getRawMaterials({ per_page: 50 }),
					inventoryAPI.getProducts({ per_page: 50 })
				]);
				setMaterials(rm.data.data || rm.data || []);
				setProducts(pr.data.data || pr.data || []);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	if (loading) return <Loading />;

	return (
		<div className="grid grid-cols-2" style={{ gap: 16 }}>
			<div className="card">
				<h3>Raw Materials</h3>
				<table width="100%">
					<thead>
						<tr>
							<th align="left">Name</th>
							<th align="right">Stock</th>
							<th align="right">Min</th>
						</tr>
					</thead>
					<tbody>
						{materials.map((m) => (
							<tr key={m.id}>
								<td>{m.name}</td>
								<td align="right">{m.current_stock}</td>
								<td align="right">{m.minimum_stock}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className="card">
				<h3>Products</h3>
				<table width="100%">
					<thead>
						<tr>
							<th align="left">Name</th>
							<th align="right">Price</th>
							<th align="right">Stock</th>
						</tr>
					</thead>
					<tbody>
						{products.map((p) => (
							<tr key={p.id}>
								<td>{p.name}</td>
								<td align="right">{Number(p.price).toFixed(2)}</td>
								<td align="right">{p.current_stock}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

