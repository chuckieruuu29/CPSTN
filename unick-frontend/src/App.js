import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import CustomerPortal from './pages/CustomerPortal';
import Sidebar from './components/common/Sidebar';
import Dashboard from './components/admin/Dashboard';
import Forecasting from './components/admin/Forecasting';
import Inventory from './components/admin/Inventory';
import Orders from './components/admin/Orders';
import Production from './components/admin/Production';
import Products from './components/admin/Products';
import Reports from './components/admin/Reports';
import Settings from './components/admin/Settings';

function PrivateRoute({ children }) {
	const token = localStorage.getItem('auth_token');
	return token ? children : <Navigate to="/login" replace />;
}

function Layout({ children }) {
	const location = useLocation();

	// ✅ Show Sidebar only on admin routes
	const isAdminRoute = location.pathname.startsWith("/admin");

	return (
		<div style={{ display: 'flex' }}>
			{isAdminRoute && <Sidebar />}
			<div style={{ flex: 1, padding: isAdminRoute ? 24 : 0 }}>
				{children}
			</div>
		</div>
	);
}

function App() {
	return (
		<BrowserRouter>
			<Layout>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/admin/*" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
					<Route path="/portal/*" element={<PrivateRoute><CustomerPortal /></PrivateRoute>} />
					
					{/* Admin subroutes */}
					<Route path="/admin/dashboard" element={<Dashboard />} />
					<Route path="/admin/forecasting" element={<Forecasting />} />
					<Route path="/admin/inventory" element={<Inventory />} />
					<Route path="/admin/orders" element={<Orders />} />
					<Route path="/admin/production" element={<Production />} />
					<Route path="/admin/products" element={<Products />} />
					<Route path="/admin/reports" element={<Reports />} />
					<Route path="/admin/settings" element={<Settings />} />

					{/* Default redirect */}
					<Route path="*" element={<Navigate to="/login" replace />} />
				</Routes>
			</Layout>
		</BrowserRouter>
	);
}

export default App;
