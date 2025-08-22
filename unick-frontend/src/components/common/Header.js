import { Bell } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
	const navigate = useNavigate();
	const logout = () => {
		localStorage.removeItem('auth_token');
		localStorage.removeItem('user_data');
		navigate('/login');
	};

	return (
		<header style={{
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			padding: '12px 20px',
			background: '#8a5b2a',
			color: '#fff',
			borderBottom: '2px solid #b07a3f'
		}}>
			<div style={{ fontWeight: 700, fontSize: 18 }}>Unick Enterprises</div>
			<div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
				<Bell size={20} style={{ cursor: 'pointer' }}/>
				<span>Admin</span>
				<button 
					onClick={logout} 
					style={{ background: '#fff', color: '#8a5b2a', border: 'none', padding: '6px 12px', borderRadius: 6, cursor: 'pointer' }}
				>
					Logout
				</button>
			</div>
		</header>
	);
}
