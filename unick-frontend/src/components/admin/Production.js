import { useEffect, useState } from 'react';
import { productionAPI } from '../../services/api';
import Loading from '../common/Loading';

export default function Production() {
  const [loading, setLoading] = useState(true);
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await productionAPI.getBatches({ per_page: 50 });
        setBatches(res.data.data || []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="container">
      <div className="card">
        <div className="card-header"><h4 className="card-title">Production Tracking</h4></div>
        <div className="card-body" style={{ padding: 12 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <Th>Code</Th>
                <Th>Product</Th>
                <Th>Quantity</Th>
                <Th>Start</Th>
                <Th>Due</Th>
                <Th>Progress</Th>
              </tr>
            </thead>
            <tbody>
              {(batches || []).map((b) => (
                <tr key={b.id} style={{ borderTop: '1px solid var(--border-color)' }}>
                  <Td>{b.batch_code}</Td>
                  <Td>{b.product?.name || '-'}</Td>
                  <Td>{b.quantity}</Td>
                  <Td>{b.start_date}</Td>
                  <Td>{b.due_date}</Td>
                  <Td>
                    <div style={{ background: '#e2e8f0', height: 8, borderRadius: 6, overflow: 'hidden', width: 120 }}>
                      <div style={{ width: `${b.progress || 0}%`, background: '#2563eb', height: '100%' }} />
                    </div>
                  </Td>
                </tr>
              ))}
              {!batches?.length && <tr><td colSpan={6} style={{ padding: 12 }}>No batches</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Th({ children }) { return <th style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text-secondary)' }}>{children}</th>; }
function Td({ children }) { return <td style={{ padding: '8px 12px' }}>{children}</td>; }