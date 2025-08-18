import { useEffect, useMemo, useState } from 'react';
import { inventoryAPI, ordersAPI, authAPI, reportsAPI } from '../services/api';
import { useNavigate, Routes, Route, Link, Navigate } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import Footer from '../components/common/Footer';
import Loading from '../components/common/Loading';
import Dashboard from '../components/admin/Dashboard';
import Inventory from '../components/admin/Inventory';
import Production from '../components/admin/Production';
import Reports from '../components/admin/Reports';
import Orders from '../components/admin/Orders';
import Forecasting from '../components/admin/Forecasting';
import Customers from '../components/admin/Customers';
import Settings from '../components/admin/Settings';

export default function AdminDashboard() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [overview, setOverview] = useState({
		lowStock: { raw_materials: [], products: [] },
		orders: [],
		salesSummary: null
	});

	useEffect(() => {
		(async () => {
			try {
				await authAPI.profile();
				const [ls, os, ss] = await Promise.all([
					inventoryAPI.getLowStock(),
					ordersAPI.getAll({ per_page: 8 }),
					reportsAPI.getSales({ range: 'last_30_days' })
				]);
				setOverview({
					lowStock: ls.data,
					orders: os.data.data || [],
					salesSummary: ss.data || null
				});
			} catch (e) {
				navigate('/login', { replace: true });
			} finally {
				setLoading(false);
			}
		})();
	}, [navigate]);

	const user = useMemo(() => {
		try { return JSON.parse(localStorage.getItem('user_data') || '{}'); } catch { return {}; }
	}, []);

	const logout = async () => {
		try { await authAPI.logout(); } catch {}
		localStorage.removeItem('auth_token');
		localStorage.removeItem('user_data');
		navigate('/login', { replace: true });
	};

	return (
		<div style={{ display: 'flex', minHeight: '100vh' }}>
			<Sidebar />

			<main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
				<header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
					<div>
						<h3 style={{ margin: 0 }}>Welcome, {user?.name || 'Admin'}</h3>
						<div style={{ color: '#64748b', fontSize: 14 }}>Have a productive day</div>
					</div>
					<div style={{ display: 'flex', gap: 8 }}>
						<Link to="/portal" className="btn btn-secondary">Customer Portal</Link>
						<button onClick={logout} className="btn btn-primary">Logout</button>
					</div>
				</header>

				<div style={{ padding: 16 }}>
					{loading ? (
						<Loading />
					) : (
						<Routes>
							<Route path="/" element={<Dashboard overview={overview} />} />
							<Route path="inventory" element={<Inventory />} />
							<Route path="production" element={<Production />} />
							<Route path="reports" element={<Reports />} />
							<Route path="orders" element={<Orders />} />
							<Route path="forecasting" element={<Forecasting />} />
							<Route path="customers" element={<Customers />} />
							<Route path="settings" element={<Settings />} />
							<Route path="*" element={<Navigate to="/admin" replace />} />
						</Routes>
					)}
				</div>

				<Footer />
			</main>
		</div>
	);
}