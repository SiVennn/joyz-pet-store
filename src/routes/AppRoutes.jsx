import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";

// Halaman User (Publik)
import Home from "../pages/user/Home";
import Products from "../pages/user/Products";
import About from "../pages/user/About";
import ProductDetail from "../pages/user/ProductDetail";

// Halaman Admin
import Login from "../pages/admin/Login";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminProducts from "../pages/admin/AdminProducts"; // ➕ Import file baru CRUD Produk
import AdminOrders from "../pages/admin/AdminOrders";     // ➕ Import file baru List Order

// Proteksi Keamanan
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ==========================================
          KELOMPOK 1: USER SIDE (Memakai UserLayout)
          ========================================== */}
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="about" element={<About />} />
        <Route path="product/:id" element={<ProductDetail />} />
      </Route>

      {/* ==========================================
          KELOMPOK 2: ADMIN SIDE (Terpisah & Aman)
          ========================================== */}
      <Route path="/admin">
        {/* Jika ketik /admin saja, arahkan langsung ke dashboard */}
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        
        {/* Halaman Login Admin (Bisa dibuka tanpa login) */}
        <Route path="login" element={<Login />} />

        {/* Semua Route di bawah ini Wajib Lolos Proteksi Login */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            {/* 3 Menu Utama Admin disatukan di sini agar terjaga Keamanan & Layoutnya */}
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} /> {/* ➕ Rute CRUD aktif */}
            <Route path="orders" element={<AdminOrders />} />     {/* ➕ Rute Order aktif */}
          </Route>
        </Route>
      </Route>

      {/* Jika mengetik URL asal-asalan, kembalikan ke Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}