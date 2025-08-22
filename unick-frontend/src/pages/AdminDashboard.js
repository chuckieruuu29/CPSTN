import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Package, ShoppingCart, Factory, Users, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function StatCard({ color, value, label, icon }) {
	return (
		<div style={{
			flex: 1,
			background: color,
			color: '#fff',
			padding: 20,
			borderRadius: 12,
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
		}}>
			{icon}
			<h2 style={{ margin: '10px 0', fontSize: 28 }}>{value}</h2>
			<p style={{ fontSize: 14 }}>{label}</p>
		</div>
	);
}

export default function Dashboard({ lowStock, orders }) {
	const navigate = useNavigate();

	const logout = () => {
		localStorage.removeItem('auth_token');
		localStorage.removeItem('user_data');
		navigate('/login');
	};

	// Dummy chart data
	const productionData = [
		{ month: 'Jan', output: 65 },
		{ month: 'Feb', output: 60 },
		{ month: 'Mar', output: 80 },
		{ month: 'Apr', output: 82 },
		{ month: 'May', output: 55 },
		{ month: 'Jun', output: 58 },
	];

	const productData = [
		{ name: 'Dining Chairs', value: 400 },
		{ name: 'Coffee Tables', value: 300 },
		{ name: 'Bookshelves', value: 200 },
		{ name: 'Dining Tables', value: 150 },
		{ name: 'Other', value: 100 },
	];
	const COLORS = ['#8b5a2b', '#a7743f', '#c28e5c', '#6a3d1a', '#d9b38c'];

	return (
		<div style={{ padding: 20 }}>
			{/* Header inside Dashboard */}
			<div style={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				marginBottom: 20,
				padding: '12px 20px',
				background: '#8a5b2a',
				color: '#fff',
				borderRadius: 8
			}}>
				<h3 style={{ margin: 0 }}>Dashboard</h3>
				<div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
					<Bell size={20} style={{ cursor: 'pointer' }} />
					<span>Admin</span>
					<button 
						onClick={logout} 
						style={{ 
							background: '#fff', 
							color: '#8a5b2a', 
							border: 'none', 
							padding: '6px 12px', 
							borderRadius: 6, 
							cursor: 'pointer',
							fontWeight: 600
						}}
					>
						Logout
					</button>
				</div>
			</div>

			{/* Stat Cards */}
			<div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
				<StatCard color="#1e90ff" value={237} label="Items in Inventory" icon={<Package size={32}/>}/>
				<StatCard color="#ffa500" value={42} label="Active Orders" icon={<ShoppingCart size={32}/>}/>
				<StatCard color="#32cd32" value={18} label="Products in Production" icon={<Factory size={32}/>}/>
				<StatCard color="#8a2be2" value={125} label="Active Customers" icon={<Users size={32}/>}/>
			</div>

			{/* Charts */}
			<div style={{ display: 'flex', gap: 20, marginBottom: 24 }}>
				{/* Bar Chart */}
				<div style={{ flex: 2, background: '#fff', padding: 20, borderRadius: 12, boxShadow: '0 4px 8px rgba(0,0,0,0.05)' }}>
					<h4>Monthly Production Output</h4>
					<ResponsiveContainer width="100%" height={250}>
						<BarChart data={productionData}>
							<XAxis dataKey="month" />
							<YAxis />
							<Tooltip />
							<Bar dataKey="output" fill="#8b5a2b" radius={[6, 6, 0, 0]} />
						</BarChart>
					</ResponsiveContainer>
				</div>

				{/* Pie Chart */}
				<div style={{ flex: 1, background: '#fff', padding: 20, borderRadius: 12, boxShadow: '0 4px 8px rgba(0,0,0,0.05)' }}>
					<h4>Top Selling Products</h4>
					<ResponsiveContainer width="100%" height={250}>
						<PieChart>
							<Pie
								data={productData}
								dataKey="value"
								cx="50%"
								cy="50%"
								outerRadius={80}
								label
							>
								{productData.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
								))}
							</Pie>
							<Legend />
						</PieChart>
					</ResponsiveContainer>
				</div>
			</div>

			{/* Tables Section */}
			<div style={{ display: 'flex', gap: 20 }}>
				{/* Recent Orders */}
				<div style={{ flex: 1, background: '#fff', padding: 20, borderRadius: 12, boxShadow: '0 4px 8px rgba(0,0,0,0.05)' }}>
					<h4>Recent Orders</h4>
					<table style={{ width: '100%', borderCollapse: 'collapse' }}>
						<thead>
							<tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
								<th style={{ padding: 8 }}>Order ID</th>
								<th style={{ padding: 8 }}>Customer</th>
								<th style={{ padding: 8 }}>Amount</th>
								<th style={{ padding: 8 }}>Status</th>
							</tr>
						</thead>
						<tbody>
							{orders.slice(0, 5).map((o, i) => (
								<tr key={i} style={{ borderBottom: '1px solid #f0f0f0' }}>
									<td style={{ padding: 8 }}>#{o.id}</td>
									<td style={{ padding: 8 }}>{o.customer_name}</td>
									<td style={{ padding: 8 }}>₱{o.amount}</td>
									<td style={{ padding: 8 }}>
										<span style={{
											padding: '4px 8px',
											borderRadius: 6,
											background: o.status === 'Shipped' ? '#1e90ff33' : '#ffa50033',
											color: o.status === 'Shipped' ? '#1e90ff' : '#ffa500',
											fontSize: 12
										}}>
											{o.status}
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{/* Low Stock Alert */}
				<div style={{ flex: 1, background: '#fff', padding: 20, borderRadius: 12, boxShadow: '0 4px 8px rgba(0,0,0,0.05)' }}>
					<h4>Low Stock Alert</h4>
					<table style={{ width: '100%', borderCollapse: 'collapse' }}>
						<thead>
							<tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
								<th style={{ padding: 8 }}>SKU</th>
								<th style={{ padding: 8 }}>Product</th>
								<th style={{ padding: 8 }}>Current Stock</th>
								<th style={{ padding: 8 }}>Reorder Point</th>
							</tr>
						</thead>
						<tbody>
							{lowStock.products.map((item, i) => (
								<tr key={i} style={{ borderBottom: '1px solid #f0f0f0' }}>
									<td style={{ padding: 8 }}>{item.sku}</td>
									<td style={{ padding: 8 }}>{item.name}</td>
									<td style={{ padding: 8 }}>{item.stock} pcs</td>
									<td style={{ padding: 8 }}>{item.reorder_point} pcs</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
