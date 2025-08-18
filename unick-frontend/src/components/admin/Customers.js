import { useEffect, useMemo, useState } from 'react';
import { ordersAPI } from '../../services/api';
import Loading from '../common/Loading';

export default function Customers() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await ordersAPI.getAll({ per_page: 100 });
        setOrders(res.data.data || []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const rows = useMemo(() => {
    const map = new Map();
    for (const o of orders) {
      const id = o.customer_id || o.customer?.id;
      if (!id) continue;
      const name = o.customer?.user?.name || `Customer ${id}`;
      const agg = map.get(id) || { id, name, orders: 0, spent: 0 };
      agg.orders += 1;
      agg.spent += Number(o.total_amount || 0);
      map.set(id, agg);
    }
    return Array.from(map.values());
  }, [orders]);

  if (loading) return <Loading />;

  return (
    <div className="container">
      <div className="card">
        <div className="card-header"><h4 className="card-title">Customers</h4></div>
        <div className="card-body" style={{ padding: 12 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <Th>Name</Th>
                <Th>Orders</Th>
                <Th>Total Spent</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr key={c.id} style={{ borderTop: '1px solid var(--border-color)' }}>
                  <Td>{c.name}</Td>
                  <Td>{c.orders}</Td>
                  <Td>{formatCurrency(c.spent)}</Td>
                </tr>
              ))}
              {!rows.length && <tr><td colSpan={3} style={{ padding: 12 }}>No customers</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Th({ children }) { return <th style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text-secondary)' }}>{children}</th>; }
function Td({ children }) { return <td style={{ padding: '8px 12px' }}>{children}</td>; }
function formatCurrency(value) { try { return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(Number(value || 0)); } catch { return `${value}`; } }
