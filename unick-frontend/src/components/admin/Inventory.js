import { useEffect, useState } from 'react';
import { inventoryAPI } from '../../services/api';
import Loading from '../common/Loading';

export default function Inventory() {
  const [loading, setLoading] = useState(true);
  const [materials, setMaterials] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const [rm, pr] = await Promise.all([
          inventoryAPI.getRawMaterials({ per_page: 100 }),
          inventoryAPI.getProducts({ per_page: 100 })
        ]);
        setMaterials(rm.data.data || []);
        setProducts(pr.data.data || []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="container">
      <div className="grid grid-cols-2">
        <div className="card">
          <div className="card-header"><h4 className="card-title">Raw Materials</h4></div>
          <div className="card-body" style={{ padding: 12 }}>
            <InventoryTable items={materials} />
          </div>
        </div>
        <div className="card">
          <div className="card-header"><h4 className="card-title">Products</h4></div>
          <div className="card-body" style={{ padding: 12 }}>
            <InventoryTable items={products} />
          </div>
        </div>
      </div>
    </div>
  );
}

function InventoryTable({ items }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <Th>Name</Th>
          <Th>Current</Th>
          <Th>Minimum</Th>
          <Th>Status</Th>
        </tr>
      </thead>
      <tbody>
        {(items || []).map((it) => {
          const low = Number(it.current_stock) < Number(it.minimum_stock);
          return (
            <tr key={it.id} style={{ borderTop: '1px solid var(--border-color)' }}>
              <Td>{it.name}</Td>
              <Td>{it.current_stock}</Td>
              <Td>{it.minimum_stock}</Td>
              <Td>
                <span className={`btn ${low ? 'btn-warning' : 'btn-success'}`} style={{ padding: '2px 8px' }}>
                  {low ? 'Low' : 'OK'}
                </span>
              </Td>
            </tr>
          );
        })}
        {!items?.length && <tr><td colSpan={4} style={{ padding: 12 }}>No records</td></tr>}
      </tbody>
    </table>
  );
}

function Th({ children }) { return <th style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text-secondary)' }}>{children}</th>; }
function Td({ children }) { return <td style={{ padding: '8px 12px' }}>{children}</td>; }