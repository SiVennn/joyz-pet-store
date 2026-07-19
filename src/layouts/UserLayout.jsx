import { Link, Outlet } from "react-router-dom";
import { useState } from "react";

export default function UserLayout() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`page ${isDarkMode ? "dark-theme" : "light-theme"}`}>
      {/* NAVBAR MODERN USER */}
      <nav className="navbar-modern">
        <div className="logoBox">
          <Link to="/"><h2 className="text-gradient">Joyz Pet Store</h2></Link>
        </div>
        
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/about">About</Link>
          {/* Menu Dashboard Admin sudah terhapus sempurna dari sini */}
        </div>

        <div className="nav-actions">
          <button onClick={toggleTheme} className="btn-theme-toggle" title="Ubah Tema">
            {isDarkMode ? "☀️ Cerah" : "🌙 Gelap"}
          </button>
          <a href="https://whatsapp.com/channel/0029Vb6dDMH47Xe34NDKHW11" target="_blank" rel="noreferrer" className="btn-neon">
            Join WhatsApp
          </a>
        </div>
      </nav>

      {/* AREA KONTEN UTAMA USER (Home, Products, About, Detail) */}
      <div className="content">
        <Outlet />
      </div>

      {/* FOOTER USER */}
      <footer className="footer-modern">
        <h3 className="text-gradient" style={{ marginBottom: "10px" }}>Joyz Pet Store</h3>
        <p style={{ color: "var(--text-muted)", fontSize: "14px", marginBottom: "20px" }}>
          Premium 3D Voxel Pets with Instant Delivery.
        </p>
        <div style={{ marginBottom: "20px", display: "flex", justifyContent: "center", gap: "20px", fontWeight: "bold" }}>
           <a href="https://wa.me/6288232273896" target="_blank" rel="noreferrer" style={{color: "#00c853"}}>Chat Admin</a>
           <Link to="/about" style={{color: "#235BFF"}}>About Us</Link>
        </div>
        <span style={{ fontSize: "12px", color: "var(--text-muted)", opacity: 0.7 }}>
          © 2026 Joyz Pet Store. All rights reserved.
        </span>
      </footer>
    </div>
  );
}