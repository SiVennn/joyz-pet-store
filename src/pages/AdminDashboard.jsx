import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function AdminDashboard() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);

  // State untuk form input
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [rarity, setRarity] = useState("Common");
  const [imageUrl, setImageUrl] = useState("");
  
  // State baru untuk mendeteksi apakah sedang mode Edit
  const [editingId, setEditingId] = useState(null);

  const fetchPets = async () => {
    const { data, error } = await supabase.from("products").select("*").order("id", { ascending: true });
    if (!error) setPets(data);
  };

  useEffect(() => {
    fetchPets();
  }, []);

  // Fungsi untuk menangani Submit (Bisa Tambah Baru atau Simpan Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price || !imageUrl) return alert("Isi semua kolom!");

    setLoading(true);

    if (editingId) {
      // PROSES EDIT DATA
      const { error } = await supabase
        .from("products")
        .update({ name, price: Number(price), rarity, image_url: imageUrl })
        .eq("id", editingId);

      if (error) {
        alert("Gagal mengubah data.");
      } else {
        alert("Produk berhasil diubah!");
        resetForm();
        fetchPets();
      }
    } else {
      // PROSES TAMBAH DATA BARU
      const { error } = await supabase
        .from("products")
        .insert([{ name, price: Number(price), rarity, image_url: imageUrl }]);

      if (error) {
        alert("Gagal menambah data.");
      } else {
        alert("Produk berhasil ditambahkan!");
        resetForm();
        fetchPets();
      }
    }
    setLoading(false);
  };

  const handleDeletePet = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus pet ini?");
    if (!confirmDelete) return;

    const { error } = await supabase.from("products").delete().eq("id", id);
    if (!error) fetchPets();
  };

  // Fungsi ketika tombol Edit ditekan
  const handleEditClick = (pet) => {
    setEditingId(pet.id);
    setName(pet.name);
    setPrice(pet.price);
    setRarity(pet.rarity);
    setImageUrl(pet.image_url);
  };

  // Fungsi untuk membatalkan edit dan mengosongkan form
  const resetForm = () => {
    setEditingId(null);
    setName("");
    setPrice("");
    setRarity("Common");
    setImageUrl("");
  };

  return (
    <div className="admin-wrapper">
      <style>{`
        .admin-wrapper {
          background-color: #0b1121;
          color: white;
          padding: 2rem;
          font-family: sans-serif;
          min-height: 100vh;
          box-sizing: border-box;
        }
        .admin-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .admin-title {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 2rem;
        }
        .admin-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media (min-width: 1024px) {
          .admin-grid { grid-template-columns: 1fr 2fr; }
        }
        .admin-card {
          background-color: #151c2c;
          padding: 1.5rem;
          border-radius: 0.75rem;
          border: 1px solid #1e293b;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          height: fit-content;
        }
        .card-title {
          font-size: 1.125rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid #1e293b;
          padding-bottom: 1rem;
        }
        .form-group {
          margin-bottom: 1rem;
        }
        .form-label {
          display: block;
          font-size: 0.875rem;
          color: #cbd5e1;
          margin-bottom: 0.5rem;
        }
        .form-input {
          width: 100%;
          padding: 0.625rem;
          background-color: white;
          color: black;
          border-radius: 0.25rem;
          border: 1px solid #ccc;
          outline: none;
          box-sizing: border-box;
        }
        .btn-submit {
          width: 100%;
          padding: 0.75rem;
          background: linear-gradient(to right, #3b82f6, #06b6d4);
          color: white;
          border: none;
          border-radius: 0.25rem;
          font-weight: bold;
          cursor: pointer;
          margin-top: 1rem;
        }
        .btn-cancel {
          width: 100%;
          padding: 0.75rem;
          background-color: #334155;
          color: white;
          border: none;
          border-radius: 0.25rem;
          font-weight: bold;
          cursor: pointer;
          margin-top: 0.5rem;
        }
        .btn-cancel:hover {
          background-color: #475569;
        }
        .table-responsive {
          overflow-x: auto;
        }
        .admin-table {
          width: 100%;
          text-align: left;
          border-collapse: collapse;
          min-width: 600px;
        }
        .admin-table th, .admin-table td {
          padding: 1rem;
          border-bottom: 1px solid #1e293b;
        }
        .admin-table th {
          background-color: rgba(26, 35, 58, 0.5);
          color: #cbd5e1;
        }
        .admin-table tr:hover {
          background-color: #1a233a;
        }
        .img-box {
          width: 70px;
          height: 70px;
          background-color: #1e293b;
          border-radius: 0.5rem;
          border: 1px solid #334155;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 5px;
          overflow: hidden;
          font-size: 10px;
          text-align: center;
          color: #94a3b8;
        }
        .img-box img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
        .badge {
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: bold;
          color: #0f172a;
          display: inline-block;
        }
        .badge.Legendary { background-color: #ffc107; }
        .badge.Epic { background-color: #c084fc; }
        .badge.Rare { background-color: #60a5fa; }
        .badge.Uncommon { background-color: #4ade80; }
        .badge.Common { background-color: #cbd5e1; }
        
        .action-flex {
          display: flex;
          gap: 1rem;
          align-items: center;
        }
        .btn-delete {
          background-color: #2a3040;
          color: #ff6b6b;
          border: 1px solid #334155;
          padding: 0.4rem 1rem;
          border-radius: 0.375rem;
          cursor: pointer;
          font-size: 0.875rem;
        }
        .btn-delete:hover { background-color: #3f2a2a; }
        .btn-edit {
          background: none;
          border: none;
          color: #60a5fa;
          cursor: pointer;
        }
        .btn-edit:hover { color: #93c5fd; }
      `}</style>

      <div className="admin-container">
        <h1 className="admin-title">Joyz Pet Store - Admin Control Panel</h1>

        <div className="admin-grid">
          {/* BAGIAN KIRI: Form Tambah/Edit Produk */}
          <div className="admin-card">
            {/* Judul berubah otomatis tergantung mode Edit/Tambah */}
            <h2 className="card-title text-[#60a5fa]">
              {editingId ? "✏️ Edit Pet" : "Tambah Pet Baru"}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Nama Pet</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-input" placeholder="Nama Pet..." />
              </div>
              <div className="form-group">
                <label className="form-label">Harga (Angka)</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="form-input" placeholder="0" />
              </div>
              <div className="form-group">
                <label className="form-label">Rarity</label>
                <select value={rarity} onChange={(e) => setRarity(e.target.value)} className="form-input">
                  <option value="Common">Common</option>
                  <option value="Uncommon">Uncommon</option>
                  <option value="Rare">Rare</option>
                  <option value="Epic">Epic</option>
                  <option value="Legendary">Legendary</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">URL / Nama Gambar</label>
                <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="form-input" placeholder="Contoh: /peacock.jpeg" />
              </div>
              
              {/* Tombol Simpan/Tambah */}
              <button type="submit" disabled={loading} className="btn-submit">
                {loading ? "Menyimpan..." : (editingId ? "Simpan Perubahan" : "Tambah Baru")}
              </button>

              {/* Tombol Batal Edit akan muncul jika sedang mode Edit */}
              {editingId && (
                <button type="button" onClick={resetForm} className="btn-cancel">
                  Batal
                </button>
              )}
            </form>
          </div>

          {/* BAGIAN KANAN: Tabel Daftar Produk */}
          <div className="admin-card" style={{ padding: 0 }}>
            <h2 className="card-title" style={{ padding: '1.5rem 1.5rem 0 1.5rem', border: 'none' }}>Daftar Katalog Pet</h2>
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Gambar</th>
                    <th>Nama</th>
                    <th>Harga</th>
                    <th>Rarity</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {pets.map((pet) => (
                    <tr key={pet.id}>
                      <td>
                        <div className="img-box">
                          <img src={pet.image_url} alt={pet.name} />
                        </div>
                      </td>
                      <td style={{ fontSize: '0.875rem' }}>{pet.name}</td>
                      <td style={{ fontSize: '0.875rem' }}>Rp {Number(pet.price).toLocaleString('id-ID')}</td>
                      <td>
                        <span className={`badge ${pet.rarity}`}>
                          {pet.rarity}
                        </span>
                      </td>
                      <td>
                        <div className="action-flex">
                          <button onClick={() => handleDeletePet(pet.id)} className="btn-delete">
                            Hapus
                          </button>
                          {/* Event onClick ditambahkan pada tombol Edit */}
                          <button onClick={() => handleEditClick(pet)} className="btn-edit" title="Edit Pet">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}