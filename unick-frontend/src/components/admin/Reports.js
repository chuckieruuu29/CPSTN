import { useEffect, useState } from 'react';
import { reportsAPI } from '../../services/api';
import Loading from '../common/Loading';

export default function Reports() {
  const [loading, setLoading] = useState(true);
  const [sales, setSales] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await reportsAPI.getSales({ range: 'last_90_days' });
        setSales(res.data || {});
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="container">
      <div className="grid grid-cols-3">
        <div className="card">
          <div className="card-header"><h4 className="card-title">Sales Summary</h4></div>
          <div className="card-body" style={{ padding: 12 }}>
            <Stat label="Total Revenue" value={formatCurrency(sales?.total || 0)} />
            <Stat label="Orders" value={sales?.orders || 0} />
            <Stat label="Unique Customers" value={sales?.unique_customers || 0} />
          </div>
        </div>
        <div className="card" style={{ gridColumn: 'span 2' }}>
          <div className="card-header"><h4 className="card-title">Top Products</h4></div>
          <div className="card-body" style={{ padding: 12 }}>
            <ul style={{ margin: 0, paddingLeft: 16 }}>
              {(sales?.top_products || []).map((p) => (
                <li key={p.id} style={{ marginBottom: 8 }}>
                  {p.name} — {p.quantity} sold ({formatCurrency(p.revenue)})
                </li>
              ))}
              {!sales?.top_products?.length && <li style={{ color: '#64748b' }}>No data</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ color: 'var(--text-secondary)', fontSize: 12 }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 700 }}>{value}</div>
    </div>
  );
}

function formatCurrency(value) {
  try { return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(Number(value || 0)); } catch {
    return `${value}`;
  }
}