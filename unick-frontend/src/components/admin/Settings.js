import { useMemo } from 'react';
import { authAPI } from '../../services/api';

export default function Settings() {
  const user = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('user_data') || '{}'); } catch { return {}; }
  }, []);

  const logout = async () => {
    try { await authAPI.logout(); } catch {}
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    window.location.href = '/login';
  };

  const toggleTheme = () => {
    const next = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    document.documentElement.dataset.theme = next;
  };

  return (
    <div className="container">
      <div className="grid grid-cols-2">
        <div className="card">
          <div className="card-header"><h4 className="card-title">Profile</h4></div>
          <div className="card-body" style={{ padding: 12 }}>
            <div><strong>Name:</strong> {user?.name || '-'}</div>
            <div><strong>Email:</strong> {user?.email || '-'}</div>
            <div><strong>Role:</strong> {user?.role || '-'}</div>
            <div style={{ marginTop: 12 }}>
              <button className="btn btn-primary" onClick={logout}>Logout</button>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header"><h4 className="card-title">Preferences</h4></div>
          <div className="card-body" style={{ padding: 12 }}>
            <button className="btn btn-secondary" onClick={toggleTheme}>Toggle Theme</button>
          </div>
        </div>
      </div>
    </div>
  );
}
