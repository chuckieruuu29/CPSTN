import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
	const navigate = useNavigate();
	const logout = () => {
		localStorage.removeItem('auth_token');
		localStorage.removeItem('user_data');
		navigate('/login');
	};
	return (
		<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: 12, background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
			<div style={{ display: 'flex', gap: 12 }}>
				<Link to="/admin">Admin</Link>
				<Link to="/portal">Portal</Link>
			</div>
			<button className="btn btn-primary" onClick={logout}>Logout</button>
		</div>
	);
}