import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function AdminLayout() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  // Fungsi pembantu untuk mewarnai menu yang sedang aktif
  const getMenuStyle = (path) => {
    const isActive = location.pathname === path;
    return {
      color: "#ffffff",
      textDecoration: "none",
      fontSize: "13px",
      fontWeight: "500",
      display: "block",
      padding: "8px 12px",
      borderRadius: "6px",
      backgroundColor: isActive ? "#1e293b" : "transparent",
      transition: "0.2s",
    };
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#0b0f19", color: "#e2e8f0", fontFamily: "sans-serif" }}>
      {/* SIDEBAR ADMIN */}
      <aside style={{ width: "220px", backgroundColor: "#0f172a", borderRight: "1px solid #1e293b", padding: "20px 12px", display: "flex", flexDirection: "column" }}>
        
        <h2 style={{ fontSize: "14px", fontWeight: "600", color: "#34d399", marginBottom: "28px", textAlign: "center", letterSpacing: "1px", textTransform: "uppercase" }}>
          Joyz Admin
        </h2>
        
        <nav style={{ flex: 1 }}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li style={{ marginBottom: "4px" }}>
              <Link to="/admin/dashboard" style={getMenuStyle("/admin/dashboard")}>
                Dashboard Overview
              </Link>
            </li>
            <li style={{ marginBottom: "4px" }}>
              <Link to="/admin/products" style={getMenuStyle("/admin/products")}>
                Manage Products
              </Link>
            </li>
            <li style={{ marginBottom: "4px" }}>
              <Link to="/admin/orders" style={getMenuStyle("/admin/orders")}>
                Customer Orders
              </Link>
            </li>
          </ul>
        </nav>

        {/* Button Logout */}
        <button 
          onClick={handleLogout}
          style={{ width: "100%", padding: "8px", backgroundColor: "#ef4444", color: "white", border: "none", borderRadius: "6px", fontWeight: "500", fontSize: "13px", cursor: "pointer", transition: "0.2s" }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#dc2626"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#ef4444"}
        >
          Logout Admin
        </button>
      </aside>

      {/* AREA UTAMA */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* TOPBAR */}
        <header style={{ height: "54px", backgroundColor: "#0f172a", borderBottom: "1px solid #1e293b", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px" }}>
          <span style={{ color: "#94a3b8", fontSize: "13px" }}>Mode Kontrol: <strong style={{ fontWeight: "600", color: "#cbd5e1" }}>Administrator</strong></span>
          <Link to="/" style={{ color: "#34d399", textDecoration: "none", fontSize: "13px", fontWeight: "500" }}>🌐 Lihat Toko</Link>
        </header>

        {/* ISI KONTEN */}
        <main style={{ flex: 1, padding: "24px", overflowY: "auto" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}