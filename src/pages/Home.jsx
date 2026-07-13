import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-container">
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="hero-text">
          <h1 className="text-gradient">Discover Premium Voxel Pets</h1>
          <p>
            Tingkatkan petualanganmu dengan aset pet 3D Voxel eksklusif. 
            Pengiriman instan, transaksi aman, dan kualitas terbaik!
          </p>
          <Link to="/products" className="btn-neon">Explore Pets</Link>
        </div>

        <div className="hero-image">
          {/* Teks alt dikosongkan ("") agar tulisan eror tidak muncul lagi */}
          <img 
            src="/Voxel Dragon 3D.png" 
            alt="" 
            className="hero-dragon-img" 
            style={{ width: "100%", maxWidth: "450px", borderRadius: "20px", display: "block" }}
            onError={(e) => {
              // Jalur Cadangan Otomatis: Jika format .png gagal, sistem langsung mencoba memuat .jpeg / .jpg
              if (!e.target.src.endsWith(".jpeg") && !e.target.src.endsWith(".jpg")) {
                e.target.src = "/Voxel Dragon 3D.jpeg";
              }
            }}
          />
        </div>
      </section>

      {/* 2. WHY CHOOSE US */}
      <section className="features-section" style={{ marginTop: "40px" }}>
        <h2 className="text-gradient section-title">Why Choose Us</h2>
        <div className="grid-modern">
          <div className="glass-card feature-card">
            <h3>⚡ Instant Delivery</h3>
            <p>Pet langsung dikirim tanpa menunggu lama.</p>
          </div>
          <div className="glass-card feature-card">
            <h3>🛡️ Trusted Seller</h3>
            <p>Transaksi 100% aman dan terpercaya.</p>
          </div>
          <div className="glass-card feature-card">
            <h3>💎 Premium Pets</h3>
            <p>Desain Voxel 3D kualitas tinggi.</p>
          </div>
          <div className="glass-card feature-card">
            <h3>🎧 Fast Response</h3>
            <p>Admin siap membantu kapan saja.</p>
          </div>
        </div>
      </section>

      {/* 3. STATISTICS */}
      <section className="stats-section glass-card">
        <div className="stat-item">
          <h2 className="text-gradient">500+</h2>
          <p>Customers</p>
        </div>
        <div className="stat-item">
          <h2 className="text-gradient">1200+</h2>
          <p>Pets Sold</p>
        </div>
        <div className="stat-item">
          <h2 className="text-gradient">24/7</h2>
          <p>Support</p>
        </div>
        <div className="stat-item">
          <h2 className="text-gradient">99%</h2>
          <p>Positive Reviews</p>
        </div>
      </section>

      {/* ================= ANATOMI 7: HOW IT WORKS ================= */}
      <section className="how-it-works-section">
        <h2 className="text-gradient section-title">Cara Mudah Transaksi Pet</h2>
        <div className="grid-modern">
          <div className="step-card">
            <span className="step-number">01</span>
            <h3>Pilih Pet & Hubungi Admin</h3>
            <p>Jelajahi katalog dan pilih pet yang ingin dibeli. Setelah itu, Anda akan langsung diarahkan ke admin kami.</p>
          </div>

          <div className="step-card">
            <span className="step-number">02</span>
            <h3>Masuk Private Room</h3>
            <p>Admin akan membuatkan server khusus (private room) di dalam game agar proses transaksi Anda jauh lebih aman dan terjamin.</p>
          </div>

          <div className="step-card">
            <span className="step-number">03</span>
            <h3>Klaim Kepemilikan Pet</h3>
            <p>Setelah transaksi berhasil, admin akan mengirimkan link khusus. Cukup akses link tersebut dan pet otomatis menjadi milik Anda!</p>
          </div>
        </div>
      </section>

      {/* ================= ANATOMI 8: TESTIMONIALS ================= */}
      <section className="testimonials-section">
        <h2 className="text-gradient section-title">Ulasan Para Pemain & Kolektor Pet</h2>
        <div className="grid-modern">
          <div className="testimonial-card">
            <p>"Aset Voxel dari Joyz sangat rapi dan mudah di-import ke Unity. Sangat menghemat waktu pengerjaan game project saya!"</p>
            <div className="client-profile">
              <div className="client-avatar"></div>
              <div>
                <h4 style={{ margin: 0 }}>Alex Supriadi</h4>
                <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Indie Game Developer</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <p>"Desain naganya sangat ikonik! Harganya sangat ramah untuk kantong developer lokal namun kualitasnya bersaing secara global."</p>
            <div className="client-profile">
              <div className="client-avatar"></div>
              <div>
                <h4 style={{ margin: 0 }}>Rian Pratama</h4>
                <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>3D Animator</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ANATOMI 9: FAQ ACCORDION ================= */}
      <section className="faq-section">
        <h2 className="text-gradient section-title">Pertanyaan yang Sering Diajukan (FAQ)</h2>
        <div className="faq-grid">
          <div className="faq-card">
            <h3 className="faq-question">Apakah saya mendapatkan file mentah 3D?</h3>
            <p className="faq-answer">Ya, setiap pembelian sudah termasuk file format .VOX (MagicaVoxel) dan .OBJ/.FBX yang siap dimasukkan ke dalam game engine.</p>
          </div>

          <div className="faq-card">
            <h3 className="faq-question">Apakah aset ini boleh digunakan untuk game komersial?</h3>
            <p className="faq-answer">Tentu saja. Semua produk yang dibeli di Joyz Pet Store dilengkapi dengan lisensi komersial penuh.</p>
          </div>
        </div>
      </section>

      {/* ================= ANATOMI 10: NEWSLETTER ================= */}
      <section className="newsletter-section">
        <h2 className="text-gradient" style={{ fontSize: "1.8rem", margin: 0 }}>Dapatkan Info Restock & Giveaway Pet Mingguan!</h2>
        <p>Daftarkan email Anda untuk menerima notifikasi rilis karakter voxel terbaru dan diskon spesial.</p>
        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Masukkan alamat email Anda" className="newsletter-input" required />
          <button type="submit" className="newsletter-btn">Langganan</button>
        </form>
      </section>
    </div>
  );
}