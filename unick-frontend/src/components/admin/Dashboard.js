import { Fragment, useMemo } from 'react';

export default function Dashboard({ overview }) {
  const { lowStock, orders, salesSummary } = overview || {};

  const stats = useMemo(() => ([
    { label: 'Total Orders', value: orders?.length || 0 },
    { label: 'Low Stock Items', value: (lowStock?.raw_materials?.length || 0) + (lowStock?.products?.length || 0) },
    { label: 'Revenue (30d)', value: formatCurrency(salesSummary?.total || 0) },
    { label: 'Customers', value: salesSummary?.unique_customers || 0 }
  ]), [orders, lowStock, salesSummary]);

  return (
    <div className="container">
      <div className="grid grid-cols-4 mb-4">
        {stats.map((s) => (
          <div key={s.label} className="card">
            <div className="card-title">{s.label}</div>
            <div className="text-xl" style={{ marginTop: 8 }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 mb-4">
        <div className="card">
          <div className="card-header"><h4 className="card-title">Low Stock Alert</h4></div>
          <div className="card-body" style={{ padding: 12 }}>
            <Section title="Raw Materials" items={lowStock?.raw_materials} empty="All good" />
            <Section title="Products" items={lowStock?.products} empty="All good" />
          </div>
        </div>

        <div className="card" style={{ gridColumn: 'span 2' }}>
          <div className="card-header"><h4 className="card-title">Recent Orders</h4></div>
          <div className="card-body" style={{ padding: 12 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <Th>#</Th>
                  <Th>Status</Th>
                  <Th>Total</Th>
                  <Th>Date</Th>
                </tr>
              </thead>
              <tbody>
                {(orders || []).slice(0, 8).map((o) => (
                  <tr key={o.id} style={{ borderTop: '1px solid var(--border-color)' }}>
                    <Td>#{o.order_number}</Td>
                    <Td>{o.status}</Td>
                    <Td>{formatCurrency(o.total_amount)}</Td>
                    <Td>{new Date(o.created_at).toLocaleDateString()}</Td>
                  </tr>
                ))}
                {!orders?.length && (
                  <tr><td colSpan={4} style={{ padding: 12, color: '#64748b' }}>No orders yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, items, empty }) {
  return (
    <Fragment>
      <div style={{ fontWeight: 600, margin: '8px 0' }}>{title}</div>
      <ul style={{ margin: 0, paddingLeft: 16 }}>
        {(items || []).slice(0, 6).map((it) => (
          <li key={it.id} style={{ marginBottom: 6 }}>
            {it.name} — Stock {it.current_stock} (Min {it.minimum_stock})
          </li>
        ))}
        {!items?.length && <li style={{ color: '#64748b' }}>{empty}</li>}
      </ul>
    </Fragment>
  );
}

function Th({ children }) {
  return <th style={{ textAlign: 'left', fontWeight: 600, padding: '8px 12px', color: 'var(--text-secondary)' }}>{children}</th>;
}

function Td({ children }) {
  return <td style={{ padding: '8px 12px' }}>{children}</td>;
}

function formatCurrency(value) {
  try { return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(Number(value || 0)); } catch {
    return `${value}`;
  }
}
