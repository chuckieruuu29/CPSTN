import { NavLink } from 'react-router-dom';

export default function Sidebar() {
	const linkStyle = ({ isActive }) => ({
		padding: '12px 14px',
		display: 'flex',
		gap: 10,
		borderRadius: 8,
		textDecoration: 'none',
		color: isActive ? '#fff' : 'var(--text-primary)',
		background: isActive ? 'linear-gradient(135deg,#8b5a2b,#a7743f)' : 'transparent'
	});

	return (
		<aside style={{
			width: 260,
			background: 'linear-gradient(180deg,#b07a3f 0%, #8a5b2a 100%)',
			color: '#fff',
			padding: 14,
			borderRight: '1px solid var(--border-color)',
			height: '100vh',
			position: 'sticky',
			top: 0
		}}>
			<div style={{ fontWeight: 800, fontSize: 20, marginBottom: 16 }}>Unick Enterprises</div>
			<nav style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
				<NavLink to="/admin/dashboard" style={linkStyle}>Dashboard</NavLink>
				<NavLink to="/admin/inventory" style={linkStyle}>Inventory</NavLink>
				<NavLink to="/admin/production" style={linkStyle}>Production</NavLink>
				<NavLink to="/admin/orders" style={linkStyle}>Orders</NavLink>
				<NavLink to="/admin/reports" style={linkStyle}>Reports</NavLink>
				<NavLink to="/admin/forecasting" style={linkStyle}>Forecasting</NavLink>
				<NavLink to="/admin/customers" style={linkStyle}>Customers</NavLink>
				<NavLink to="/admin/products" style={linkStyle}>Products</NavLink>
				<NavLink to="/admin/settings" style={linkStyle}>Settings</NavLink>
			</nav>
		</aside>
	);
}

