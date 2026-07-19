import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({ name: "", price: "", image_url: "", rarity: "Common" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("id", { ascending: true });

        if (error) throw error;
        if (data) setProducts(data);
      } catch (err) {
        console.error("Gagal mengambil data:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.rarity) {
      return alert("Nama, Harga, dan Rarity wajib diisi!");
    }

    try {
      if (editId) {
        const { data, error } = await supabase
          .from("products")
          .update({
            name: formData.name,
            price: Number(formData.price),
            image_url: formData.image_url,
            rarity: formData.rarity,
          })
          .eq("id", editId)
          .select();

        if (error) throw error;

        setProducts((prev) => prev.map((item) => (item.id === editId ? data[0] : item)));
        setEditId(null);
        alert("Pet berhasil diperbarui! ✏️");
      } else {
        const { data, error } = await supabase
          .from("products")
          .insert([{
            name: formData.name,
            price: Number(formData.price),
            image_url: formData.image_url,
            rarity: formData.rarity,
          }])
          .select();

        if (error) throw error;

        setProducts((prev) => [...prev, data[0]]);
        alert("Pet baru berhasil ditambahkan! 🎉");
      }

      setFormData({ name: "", price: "", image_url: "", rarity: "Common" });
    } catch (err) {
      alert("Gagal menyimpan: " + err.message);
    }
  };

  const startEdit = (pet) => {
    setEditId(pet.id);
    setFormData({ 
      name: pet.name, 
      price: pet.price, 
      image_url: pet.image_url || "", 
      rarity: pet.rarity || "Common" 
    });
  };

  const cancelEdit = () => {
    setEditId(null);
    setFormData({ name: "", price: "", image_url: "", rarity: "Common" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Apakah Anda yakin ingin menghapus Voxel Pet ini?")) return;

    try {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;

      setProducts((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const getRarityColor = (rarity) => {
    switch (rarity?.toLowerCase()) {
      case "legendary": return { color: "#ff9800", bg: "#2c1d01" };
      case "epic": return { color: "#e040fb", bg: "#25022b" };
      case "rare": return { color: "#29b6f6", bg: "#011c2a" };
      default: return { color: "#94a3b8", bg: "#1e293b" };
    }
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "20px", color: "#ffffff" }}>
        Manage Voxel Pets
      </h2>

      {/* FORM INPUT */}
      <div style={{ backgroundColor: "#1e293b", padding: "20px", borderRadius: "8px", marginBottom: "24px", border: "1px solid #334155" }}>
        <h3 style={{ fontSize: "14px", color: "#34d399", marginBottom: "14px", fontWeight: "600" }}>
          {editId ? "Edit Pet" : "Tambah Pet Baru"}
        </h3>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "flex-end" }}>
          <div style={{ flex: 1, minWidth: "160px" }}>
            <label style={{ display: "block", fontSize: "11px", color: "#94a3b8", marginBottom: "4px" }}>Nama Pet</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Neon Dragon" style={{ width: "100%", padding: "8px 12px", fontSize: "13px", backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "6px", color: "#fff" }} />
          </div>
          <div style={{ flex: 1, minWidth: "110px" }}>
            <label style={{ display: "block", fontSize: "11px", color: "#94a3b8", marginBottom: "4px" }}>Harga (IDR)</label>
            <input type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="75000" style={{ width: "100%", padding: "8px 12px", fontSize: "13px", backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "6px", color: "#fff" }} />
          </div>
          <div style={{ flex: 1, minWidth: "120px" }}>
            <label style={{ display: "block", fontSize: "11px", color: "#94a3b8", marginBottom: "4px" }}>Tingkat Rarity</label>
            <select name="rarity" value={formData.rarity} onChange={handleInputChange} style={{ width: "100%", padding: "8px 12px", fontSize: "13px", backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "6px", color: "#fff", cursor: "pointer" }}>
              <option value="Common">🟢 Common</option>
              <option value="Rare">🔵 Rare</option>
              <option value="Epic">🟣 Epic</option>
              <option value="Legendary">🟡 Legendary</option>
            </select>
          </div>
          <div style={{ flex: 2, minWidth: "200px" }}>
            <label style={{ display: "block", fontSize: "11px", color: "#94a3b8", marginBottom: "4px" }}>URL Gambar / Voxel File</label>
            <input type="text" name="image_url" value={formData.image_url} onChange={handleInputChange} placeholder="https://example.com/pet.png" style={{ width: "100%", padding: "8px 12px", fontSize: "13px", backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "6px", color: "#fff" }} />
          </div>
          <div style={{ display: "flex", gap: "6px" }}>
            <button type="submit" style={{ padding: "8px 16px", fontSize: "13px", backgroundColor: "#34d399", color: "#0f172a", border: "none", borderRadius: "6px", fontWeight: "600", cursor: "pointer" }}>
              {editId ? "Simpan" : "Tambah"}
            </button>
            {editId && (
              <button type="button" onClick={cancelEdit} style={{ padding: "8px 12px", fontSize: "13px", backgroundColor: "#64748b", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      {/* TABEL DAFTAR */}
      <div style={{ backgroundColor: "#1e293b", borderRadius: "8px", border: "1px solid #334155", overflow: "hidden" }}>
        {loading ? (
          <p style={{ padding: "16px", color: "#94a3b8", textAlign: "center", fontSize: "13px" }}>Memuat data...</p>
        ) : products.length === 0 ? (
          <p style={{ padding: "16px", color: "#94a3b8", textAlign: "center", fontSize: "13px" }}>Belum ada data pet.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
            <thead>
              <tr style={{ backgroundColor: "#0f172a", borderBottom: "1px solid #334155", color: "#94a3b8" }}>
                <th style={{ padding: "12px 16px" }}>ID</th>
                <th style={{ padding: "12px 16px" }}>Foto</th>
                <th style={{ padding: "12px 16px" }}>Nama Pet</th>
                <th style={{ padding: "12px 16px" }}>Rarity</th>
                <th style={{ padding: "12px 16px" }}>Harga</th>
                <th style={{ padding: "12px 16px", textAlign: "center" }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.map((pet) => {
                const badge = getRarityColor(pet.rarity);
                return (
                  <tr key={pet.id} style={{ borderBottom: "1px solid #334155", color: "#e2e8f0" }}>
                    <td style={{ padding: "12px 16px", color: "#64748b" }}>#{pet.id}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <img src={pet.image_url || "https://placehold.co/40"} alt={pet.name} style={{ width: "36px", height: "36px", borderRadius: "6px", objectFit: "cover", backgroundColor: "#0f172a" }} />
                    </td>
                    <td style={{ padding: "12px 16px", fontWeight: "500" }}>{pet.name}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ padding: "2px 8px", borderRadius: "10px", fontSize: "11px", fontWeight: "600", color: badge.color, backgroundColor: badge.bg, border: `1px solid ${badge.color}30` }}>
                        {pet.rarity || "Common"}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px", color: "#34d399", fontWeight: "500" }}>Rp {Number(pet.price).toLocaleString("id-ID")}</td>
                    <td style={{ padding: "12px 16px", textAlign: "center" }}>
                      <button onClick={() => startEdit(pet)} style={{ padding: "4px 10px", backgroundColor: "#3b82f6", color: "white", border: "none", borderRadius: "4px", marginRight: "6px", cursor: "pointer", fontSize: "11px" }}>Edit</button>
                      <button onClick={() => handleDelete(pet.id)} style={{ padding: "4px 10px", backgroundColor: "#ef4444", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "11px" }}>Hapus</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}