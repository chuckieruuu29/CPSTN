import { useEffect, useState } from "react";
import { ordersAPI } from '../../services/api';

export default function OrderTracking() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await ordersAPI.getAll();
      setOrders(res.data.data || []);
    })();
  }, []);

  return (
    <div>
      <h2>My Orders</h2>
      {orders.length === 0 && <p>No orders yet.</p>}
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.order_number}</td>
              <td>{new Date(o.created_at).toLocaleDateString()}</td>
              <td>{o.status}</td>
              <td>₱ {Number(o.total).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
