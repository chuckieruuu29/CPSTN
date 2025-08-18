export default function Loading({ label = 'Loading...' }) {
  return (
    <div style={{ padding: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
      <span className="loading" style={{ color: '#2563eb' }} />
      <span style={{ color: '#64748b' }}>{label}</span>
    </div>
  );
}