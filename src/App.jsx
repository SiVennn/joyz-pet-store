import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import ProductDetail from "./pages/ProductDetail";
// 1. TAMBAHKAN IMPORT ADMIN DI SINI 👇
import AdminDashboard from "./pages/AdminDashboard"; 
import "./App.css";

function App() {
  // State untuk melacak mode (default: dark/gelap)
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <BrowserRouter>
      {/* Mengatur kelas tema pada kontainer utama */}
      <div className={`page ${isDarkMode ? "dark-theme" : "light-theme"}`}>
        
        {/* NAVBAR MODERN */}
        <nav className="navbar-modern">
          <div className="logoBox">
            <Link to="/"><h2 className="text-gradient">Joyz Pet Store</h2></Link>
          </div>
          
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/about">About</Link>
            {/* 2. TAMBAHKAN MENU ADMIN DI SINI 👇 */}
            <Link to="/admin" style={{ color: "#34d399", fontWeight: "bold" }}>Admin Panel</Link>
          </div>

          {/* AREA DI KANAN ATAS */}
          <div className="nav-actions">
            {/* TOMBOL TOGGLE MODE CERAH/GELAP */}
            <button onClick={toggleTheme} className="btn-theme-toggle" title="Ubah Tema">
              {isDarkMode ? "☀️ Cerah" : "🌙 Gelap"}
            </button>

            {/* TOMBOL JOIN WHATSAPP */}
            <a 
              href="https://whatsapp.com/channel/0029Vb6dDMH47Xe34NDKHW11" 
              target="_blank" 
              rel="noreferrer" 
              className="btn-neon"
            >
              Join WhatsApp
            </a>
          </div>
        </nav>

        {/* AREA KONTEN UTAMA */}
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            {/* 3. TAMBAHKAN RUTE ADMIN DI SINI 👇 */}
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </div>

        {/* FOOTER */}
        <footer className="footer-modern">
          <h3 className="text-gradient" style={{ marginBottom: "10px" }}>Joyz Pet Store</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "14px", marginBottom: "20px" }}>
            Premium 3D Voxel Pets with Instant Delivery.
          </p>
          
          <div style={{ marginBottom: "20px", display: "flex", justifyContent: "center", gap: "20px", fontWeight: "bold" }}>
             <a href="https://wa.me/6288232273896" target="_blank" rel="noreferrer" style={{color: "#00c853"}}>
               Chat Admin
             </a>
             <Link to="/about" style={{color: "#235BFF"}}>
               About Us
             </Link>
          </div>

          <span style={{ fontSize: "12px", color: "var(--text-muted)", opacity: 0.7 }}>
            © 2026 Joyz Pet Store. All rights reserved.
          </span>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;