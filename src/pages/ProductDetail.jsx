import { useParams, Link } from "react-router-dom";
import { pets } from "../data/pets";

export default function ProductDetail() {
  const { id } = useParams();
  
  // Mencari data pet berdasarkan ID URL
  const pet = pets.find((p) => p.id === parseInt(id));

  if (!pet) {
    return (
      <div className="error-container">
        <h2>Pet Tidak Ditemukan!</h2>
        <Link to="/products" className="back-arrow-btn">← Kembali ke Produk</Link>
      </div>
    );
  }

  // Membuat teks pesan otomatis untuk WhatsApp
  const waMessage = encodeURIComponent(
    `Halo Admin, saya ingin membeli produk Voxel Pet ini:\n\n` +
    `• Nama Pet: ${pet.name}\n` +
    `• Rarity: ${pet.rarity}\n` +
    `• Harga: ${pet.price}\n\n` +
    `Mohon info langkah pembayaran selanjutnya, terima kasih!`
  );

  return (
    <div className="home-container">
      <div className="detail-wrapper">
        
        {/* TOMBOL KEMBALI BERBENTUK ANAK PANAH KIRI */}
        <Link to="/products" className="back-arrow-btn" title="Kembali ke Katalog">
          ←
        </Link>

        {/* LAYOUT SPLIT: KIRI (GAMBAR) & KANAN (INFO) */}
        <div className="detail-layout-grid">
          
          {/* SISI KIRI: KOTAK BINGKAI GAMBAR PET */}
          <div className="detail-image-container glass-card">
            <span className={`rarity-badge ${pet.rarity?.toLowerCase()}`}>
              {pet.rarity}
            </span>
            <img 
              src={pet.image} 
              alt={pet.name} 
              className="detail-pet-image"
            />
          </div>

          {/* SISI KANAN: DETAIL INFORMASI PRODUK */}
          <div className="detail-info-container glass-card">
            <div>
              <h1 className="text-gradient pet-detail-title">{pet.name}</h1>
              
              <div className="rating-row">
                <span className="stars">⭐ 4.7</span>
                <span className="reviews-count">(3 reviews)</span>
              </div>
              
              <h2 className="detail-price-tag">{pet.price}</h2>
              
              <div className="divider-line"></div>
              
              <h3 style={{ color: "#fff", marginBottom: "8px", fontSize: "1.1rem" }}>Description</h3>
              <p className="pet-description-text">
                {pet.description || "Tingkatkan petualangan hebatmu dengan aset 3D Voxel premium eksklusif ini. Memiliki detail grafis tinggi dan siap pakai!"}
              </p>
              
              <div className="secure-note">
                <span>🛡️ Transaksi 100% Instan & Aman melalui WhatsApp Admin</span>
              </div>
            </div>

            {/* TOMBOL BUY NOW DI SEBELAH KANAN BAWAH WARNA HIJAU */}
            <div className="detail-action-row">
              <a 
                href={`https://wa.me/6288232273896?text=${waMessage}`}
                target="_blank" 
                rel="noreferrer" 
                className="btn-buy-now-green"
              >
                Buy Now
              </a>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}