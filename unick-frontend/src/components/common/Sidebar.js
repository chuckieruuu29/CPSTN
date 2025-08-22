import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Box, Factory, ShoppingCart, FileText, BarChart2, Users, Package, Settings as Cog, LogOut } from 'lucide-react';

export default function Sidebar() {
	const navigate = useNavigate();

	const handleLogout = () => {
		// Clear authentication data
		localStorage.removeItem('auth_token');
		localStorage.removeItem('user_data');

		// Navigate to login
		navigate('/login', { replace: true });
	};

	const linkStyle = ({ isActive }) => ({
		padding: '12px 16px',
		display: 'flex',
		alignItems: 'center',
		gap: 12,
		borderRadius: 8,
		textDecoration: 'none',
		color: isActive ? '#fff' : '#f1f1f1',
		background: isActive ? 'rgba(0,0,0,0.25)' : 'transparent',
		fontWeight: 500
	});

	return (
		<aside style={{
			width: 260,
			background: 'linear-gradient(180deg,#b07a3f 0%, #8a5b2a 100%)',
			color: '#fff',
			padding: 16,
			borderRight: '1px solid #a7743f',
			height: '100vh',
			position: 'sticky',
			top: 0,
			display: 'flex',
			flexDirection: 'column'
		}}>
			<div style={{ fontWeight: 800, fontSize: 22, marginBottom: 24 }}>Unick Enterprises</div>
			
			{/* Navigation Links */}
			<nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
				<NavLink to="/admin/dashboard" style={linkStyle}><LayoutDashboard size={18}/> Dashboard</NavLink>
				<NavLink to="/admin/inventory" style={linkStyle}><Box size={18}/> Inventory</NavLink>
				<NavLink to="/admin/production" style={linkStyle}><Factory size={18}/> Production</NavLink>
				<NavLink to="/admin/orders" style={linkStyle}><ShoppingCart size={18}/> Orders</NavLink>
				<NavLink to="/admin/reports" style={linkStyle}><FileText size={18}/> Reports</NavLink>
				<NavLink to="/admin/forecasting" style={linkStyle}><BarChart2 size={18}/> Forecasting</NavLink>
				<NavLink to="/admin/customers" style={linkStyle}><Users size={18}/> Customers</NavLink>
				<NavLink to="/admin/products" style={linkStyle}><Package size={18}/> Products</NavLink>
				<NavLink to="/admin/settings" style={linkStyle}><Cog size={18}/> Settings</NavLink>
			</nav>

			{/* Logout Button */}
			<button
				onClick={handleLogout}
				style={{
					marginTop: 'auto',
					padding: '12px 16px',
					display: 'flex',
					alignItems: 'center',
					gap: 12,
					borderRadius: 8,
					background: 'rgba(0,0,0,0.25)',
					color: '#fff',
					border: 'none',
					cursor: 'pointer',
					fontWeight: 500
				}}
			>
				<LogOut size={18}/> Logout
			</button>
		</aside>
	);
}
