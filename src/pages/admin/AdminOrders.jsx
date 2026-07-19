import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .order("id", { ascending: false });

        if (error) throw error;
        if (data) setOrders(data);
      } catch (err) {
        console.error("Gagal memuat order:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const toggleOrderStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Pending" ? "Success" : "Pending";
    try {
      const { error } = await supabase
        .from("orders")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;
      setOrders((prev) => prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item)));
    } catch (err) {
      alert("Gagal merubah status: " + err.message);
    }
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", fontSize: "13px" }}>
      <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "20px", color: "#ffffff" }}>Customer Orders</h2>

      <div style={{ backgroundColor: "#1e293b", borderRadius: "8px", border: "1px solid #334155", overflow: "hidden" }}>
        {loading ? (
          <p style={{ padding: "16px", color: "#94a3b8", textAlign: "center" }}>Memuat riwayat order...</p>
        ) : orders.length === 0 ? (
          <p style={{ padding: "16px", color: "#94a3b8", textAlign: "center" }}>Belum ada pesanan masuk.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ backgroundColor: "#0f172a", borderBottom: "1px solid #334155", color: "#94a3b8" }}>
                <th style={{ padding: "12px 16px" }}>Order ID</th>
                <th style={{ padding: "12px 16px" }}>Email Pelanggan</th>
                <th style={{ padding: "12px 16px" }}>Nama Produk</th>
                <th style={{ padding: "12px 16px" }}>Total Bayar</th>
                <th style={{ padding: "12px 16px" }}>Status</th>
                <th style={{ padding: "12px 16px", textAlign: "center" }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} style={{ borderBottom: "1px solid #334155", color: "#e2e8f0" }}>
                  <td style={{ padding: "12px 16px", color: "#64748b" }}>#{order.id}</td>
                  <td style={{ padding: "12px 16px" }}>{order.customer_email || "Guest"}</td>
                  <td style={{ padding: "12px 16px", fontWeight: "500" }}>{order.product_name}</td>
                  <td style={{ padding: "12px 16px", color: "#34d399" }}>Rp {Number(order.total_price).toLocaleString("id-ID")}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ 
                      padding: "2px 8px", borderRadius: "10px", fontSize: "11px", fontWeight: "600",
                      backgroundColor: order.status === "Success" ? "#012a1c" : "#2a1e01",
                      color: order.status === "Success" ? "#34d399" : "#ff9800"
                    }}>
                      {order.status || "Pending"}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "center" }}>
                    <button 
                      onClick={() => toggleOrderStatus(order.id, order.status)} 
                      style={{ padding: "4px 10px", backgroundColor: "#334155", color: "white", border: "1px solid #475569", borderRadius: "4px", cursor: "pointer", fontSize: "11px" }}
                    >
                      Ubah Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}