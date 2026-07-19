import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalProducts: 0, totalOrders: 0, totalRevenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // 1. Ambil jumlah baris dari tabel products
        const { count: productCount } = await supabase
          .from("products")
          .select("*", { count: "exact", head: true });

        // 2. Ambil data dari tabel orders untuk menghitung total order & omset
        const { data: orderData, count: orderCount } = await supabase
          .from("orders")
          .select("total_price");

        const revenue = orderData ? orderData.reduce((sum, item) => sum + (Number(item.total_price) || 0), 0) : 0;

        setStats({
          totalProducts: productCount || 0,
          totalOrders: orderCount || 0,
          totalRevenue: revenue
        });
      } catch (err) {
        console.error("Gagal memuat statistik:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cardStyle = {
    flex: 1,
    minWidth: "240px",
    backgroundColor: "#1e293b",
    border: "1px solid #334155",
    borderRadius: "8px",
    padding: "20px",
    color: "#ffffff"
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", fontSize: "13px" }}>
      <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "20px", color: "#ffffff" }}>Dashboard Overview</h2>
      
      {loading ? (
        <p style={{ color: "#94a3b8" }}>Memuat performa toko...</p>
      ) : (
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          
          <div style={cardStyle}>
            <span style={{ color: "#94a3b8", display: "block", marginBottom: "8px", fontSize: "11px", textTransform: "uppercase", fontWeight: "600" }}>Total Koleksi Pet</span>
            <strong style={{ fontSize: "24px", color: "#34d399" }}>{stats.totalProducts} Items</strong>
          </div>
          
          <div style={cardStyle}>
            <span style={{ color: "#94a3b8", display: "block", marginBottom: "8px", fontSize: "11px", textTransform: "uppercase", fontWeight: "600" }}>Pesanan Masuk</span>
            <strong style={{ fontSize: "24px", color: "#3b82f6" }}>{stats.totalOrders} Transaksi</strong>
          </div>

          <div style={cardStyle}>
            <span style={{ color: "#94a3b8", display: "block", marginBottom: "8px", fontSize: "11px", textTransform: "uppercase", fontWeight: "600" }}>Total Pendapatan</span>
            <strong style={{ fontSize: "24px", color: "#ff9800" }}>Rp {stats.totalRevenue.toLocaleString("id-ID")}</strong>
          </div>

        </div>
      )}
    </div>
  );
}