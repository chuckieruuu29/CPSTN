import { useEffect, useMemo, useState } from 'react';
import { reportsAPI, inventoryAPI } from '../../services/api';
import Loading from '../common/Loading';

export default function Forecasting() {
  const [loading, setLoading] = useState(true);
  const [sales, setSales] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const [sr, pr] = await Promise.all([
          reportsAPI.getSales({ range: 'last_90_days' }),
          inventoryAPI.getProducts({ per_page: 100 })
        ]);
        setSales(sr.data || {});
        setProducts(pr.data.data || []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const monthForecasts = useMemo(() => {
    const base = Number(sales?.total || 0) / 3 || 0;
    const arr = [0.95, 1.0, 1.05].map((m, i) => ({ label: `M${i + 1}`, value: Math.round(base * m) }));
    return arr;
  }, [sales]);

  if (loading) return <Loading />;

  return (
    <div className="container">
      <div className="grid grid-cols-3">
        <div className="card">
          <div className="card-header"><h4 className="card-title">Inventory Forecast</h4></div>
          <div className="card-body" style={{ padding: 12 }}>
            <div style={{ color: 'var(--text-secondary)', marginBottom: 6 }}>Projected revenue next 3 months</div>
            <BarChart items={monthForecasts} />
          </div>
        </div>

        <div className="card">
          <div className="card-header"><h4 className="card-title">Material Replenishment</h4></div>
          <div className="card-body" style={{ padding: 12 }}>
            <ul style={{ margin: 0, paddingLeft: 16 }}>
              {(products || []).filter(p => Number(p.current_stock) < Number(p.minimum_stock)).slice(0, 8).map(p => (
                <li key={p.id} style={{ marginBottom: 6 }}>{p.name} — Stock {p.current_stock} (Min {p.minimum_stock})</li>
              ))}
              {!products?.length && <li>No data</li>}
            </ul>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><h4 className="card-title">Notes</h4></div>
          <div className="card-body" style={{ padding: 12 }}>
            <div className="text-secondary">Forecasts are simple heuristics based on last 90 days sales totals.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BarChart({ items }) {
  const max = Math.max(...items.map(i => i.value), 1);
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', height: 160 }}>
      {items.map((i) => (
        <div key={i.label}>
          <div style={{ background: '#2563eb', width: 40, height: Math.max(6, (i.value / max) * 140), borderRadius: 6 }} />
          <div style={{ textAlign: 'center', marginTop: 6, color: 'var(--text-secondary)' }}>{i.label}</div>
        </div>
      ))}
    </div>
  );
}
