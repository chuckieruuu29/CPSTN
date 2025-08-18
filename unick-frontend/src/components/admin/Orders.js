import { useEffect, useState } from 'react';
import { ordersAPI } from '../../services/api';
import Loading from '../common/Loading';

export default function Orders() {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [response, setResponse] = useState({ data: [], current_page: 1, last_page: 1, total: 0 });

  const load = async (nextPage = 1, nextStatus = status) => {
    setLoading(true);
    try {
      const res = await ordersAPI.getAll({ per_page: 10, page: nextPage, status: nextStatus || undefined });
      setResponse(res.data || { data: [] });
      setPage(nextPage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(1, status); /* eslint-disable-next-line */ }, [status]);
  useEffect(() => { load(1, status); /* eslint-disable-next-line */ }, []);

  const approve = async (id) => {
    try {
      await ordersAPI.approve(id);
      await load(page, status);
    } catch {}
  };

  if (loading) return <Loading />;

  const { data = [], current_page = 1, last_page = 1 } = response || {};

  return (
    <div className="container">
      <div className="card" style={{ marginBottom: 12 }}>
        <div className="card-body" style={{ padding: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ fontWeight: 600 }}>Filter:</div>
          <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ maxWidth: 220 }}>
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="in_production">In Production</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>

      <div className="card">
        <div className="card-header"><h4 className="card-title">Orders</h4></div>
        <div className="card-body" style={{ padding: 12 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <Th>#</Th>
                <Th>Customer</Th>
                <Th>Status</Th>
                <Th>Total</Th>
                <Th>Date</Th>
                <Th>Action</Th>
              </tr>
            </thead>
            <tbody>
              {data.map((o) => (
                <tr key={o.id} style={{ borderTop: '1px solid var(--border-color)' }}>
                  <Td>#{o.order_number}</Td>
                  <Td>{o.customer?.user?.name || '-'}</Td>
                  <Td>{o.status}</Td>
                  <Td>{formatCurrency(o.total_amount)}</Td>
                  <Td>{new Date(o.created_at).toLocaleString()}</Td>
                  <Td>
                    {o.status === 'pending' && (
                      <button className="btn btn-primary" onClick={() => approve(o.id)}>Approve</button>
                    )}
                  </Td>
                </tr>
              ))}
              {!data.length && <tr><td colSpan={6} style={{ padding: 12 }}>No orders</td></tr>}
            </tbody>
          </table>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
            <button className="btn btn-secondary" onClick={() => load(Math.max(1, current_page - 1), status)} disabled={current_page <= 1}>Prev</button>
            <div className="text-secondary">Page {current_page} of {last_page}</div>
            <button className="btn btn-secondary" onClick={() => load(Math.min(last_page, current_page + 1), status)} disabled={current_page >= last_page}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Th({ children }) { return <th style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text-secondary)' }}>{children}</th>; }
function Td({ children }) { return <td style={{ padding: '8px 12px' }}>{children}</td>; }
function formatCurrency(value) { try { return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(Number(value || 0)); } catch { return `${value}`; } }
