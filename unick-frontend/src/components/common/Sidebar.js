import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem('user_data') || '{}');
  const isAdmin = user?.role === 'admin' || user?.role === 'staff';

  return (
    <aside style={{ width: 260, background: '#8a5a2b', color: '#fff', minHeight: '100vh', position: 'sticky', top: 0 }}>
      <div style={{ padding: 16, borderBottom: '1px solid rgba(255,255,255,0.2)', background: 'linear-gradient(135deg,#8a5a2b,#a66d35)' }}>
        <div style={{ fontWeight: 800, fontSize: 20 }}>Unick Enterprises</div>
        <div style={{ fontSize: 12, opacity: 0.9 }}>{user?.name || 'Guest'}</div>
      </div>

      <nav style={{ padding: 8 }}>
        <Section title="Admin" show={isAdmin} />
        {isAdmin && (
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            <Item to="/admin" icon="🏠" label="Dashboard" end />
            <Item to="/admin/inventory" icon="📦" label="Inventory" />
            <Item to="/admin/production" icon="🏭" label="Production" />
            <Item to="/admin/orders" icon="🧾" label="Orders" />
            <Item to="/admin/reports" icon="📊" label="Reports" />
            <Item to="/admin/forecasting" icon="📈" label="Forecasting" />
            <Item to="/admin/customers" icon="👥" label="Customers" />
            <Item to="/admin/settings" icon="⚙️" label="Settings" />
          </ul>
        )}

        <Section title="Customer" show={!isAdmin} />
        {!isAdmin && (
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            <Item to="/portal" icon="🛒" label="Shop" end />
            <Item to="/portal/orders" icon="📦" label="My Orders" />
          </ul>
        )}
      </nav>
    </aside>
  );
}

function Section({ title, show }) {
  if (!show) return null;
  return (
    <div style={{ padding: '12px 12px 6px', fontSize: 12, letterSpacing: 0.6, textTransform: 'uppercase', opacity: 0.8 }}>
      {title}
    </div>
  );
}

function Item({ to, icon, label, end }) {
  return (
    <li>
      <NavLink
        to={to}
        end={end}
        style={({ isActive }) => ({
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '10px 12px',
          margin: '4px 8px',
          borderRadius: 8,
          color: '#fff',
          textDecoration: 'none',
          background: isActive ? 'rgba(255,255,255,0.12)' : 'transparent'
        })}
      >
        <span style={{ width: 20, textAlign: 'center' }}>{icon}</span>
        <span>{label}</span>
      </NavLink>
    </li>
  );
}