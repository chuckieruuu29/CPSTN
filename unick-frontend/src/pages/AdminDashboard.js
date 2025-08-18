import { useEffect, useState } from 'react';
import { inventoryAPI, ordersAPI, authAPI } from '../services/api';
import { useNavigate, Routes, Route, Navigate, Link } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import Footer from '../components/common/Footer';
import Dashboard from '../components/admin/Dashboard';
import Inventory from '../components/admin/Inventory';
import Production from '../components/admin/Production';
import Reports from '../components/admin/Reports';
import Forecasting from '../components/admin/Forecasting';
import Customers from '../components/admin/Customers';
import Products from '../components/admin/Products';
import Orders from '../components/admin/Orders';

export default function AdminDashboard() {
	const navigate = useNavigate();
	const [lowStock, setLowStock] = useState({ raw_materials: [], products: [] });
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				await authAPI.profile();
				const [ls, os] = await Promise.all([
					inventoryAPI.getLowStock(),
					ordersAPI.getAll({ per_page: 10 })
				]);
				setLowStock(ls.data);
				setOrders(os.data.data || []);
			} catch (e) {
				navigate('/login', { replace: true });
			}
		})();
	}, [navigate]);

	const logout = async () => {
		try { await authAPI.logout(); } catch {}
		localStorage.removeItem('auth_token');
		localStorage.removeItem('user_data');
		navigate('/login', { replace: true });
	};

	return (
		<div style={{ display: 'flex' }}>
			<Sidebar />
			<div style={{ flex: 1, minHeight: '100vh', background: 'var(--background-color)' }}>
				<header style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					padding: 16,
					background: '#fff',
					borderBottom: '1px solid var(--border-color)'
				}}>
					<div style={{ fontWeight: 700 }}>Admin</div>
					<div style={{ display: 'flex', gap: 10 }}>
						<Link to="/portal" className="btn btn-secondary">Customer Portal</Link>
						<button className="btn btn-primary" onClick={logout}>Logout</button>
					</div>
				</header>
				<main style={{ padding: 16 }}>
					<Routes>
						<Route path="/admin/dashboard" element={<Dashboard lowStock={lowStock} orders={orders} />} />
						<Route path="/admin/inventory" element={<Inventory />} />
						<Route path="/admin/production" element={<Production />} />
						<Route path="/admin/orders" element={<Orders />} />
						<Route path="/admin/reports" element={<Reports />} />
						<Route path="/admin/forecasting" element={<Forecasting />} />
						<Route path="/admin/customers" element={<Customers />} />
						<Route path="/admin/products" element={<Products />} />
						<Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</div>
	);
}