import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-container">
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="hero-text">
          <h1 className="text-gradient">Discover Premium Voxel Pets</h1>
          <p>
            Tingkatkan petualangan in-game kamu dengan koleksi Pet eksklusif. Transaksi super aman via Private Room dan pengiriman instan melalui sistem Link Klaim otomatis!
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
            <p>Setelah pembayaran terkonfirmasi, admin akan menghubungi Anda untuk proses pengiriman pet secara langsung melalui sistem Gift di dalam game. Transaksi 100% aman, cepat, dan anti ribet!</p>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <h2 className="text-gradient section-title">Ulasan Para Pemain & Kolektor Pet</h2>
{/* ================= ANATOMI 8: TESTIMONIALS ================= */}
      <div className="grid-modern">
        <div className="testimonial-card">
          <p>"Transaksinya aman banget! Adminnya responsif, dikasih link untuk masuk ke private room khusus di dalam game, lalu pet langsung dikirim via gift oleh admin. Prosesnya mulus!"</p>
          <div className="client-profile">
            <div className="client-avatar"></div>
            <div>
              <h4 style={{ margin: 0 }}>Alex Supriadi</h4>
              {/* JABATAN SUDAH DIUBAH MENJADI PET COLLECTOR */}
              <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Pet Collector / Gamer</span>
            </div>
          </div>
        </div>

        <div className="testimonial-card">
          <p>"Prosesnya cepat dan anti ribet! Habis bayar, langsung dikasih link private room sama admin. Tinggal masuk ke gamenya, dan pet naganya langsung di-gift. Recommended toko ini!"</p>
          <div className="client-profile">
            <div className="client-avatar"></div>
            <div>
              <h4 style={{ margin: 0 }}>Rian Pratama</h4>
              {/* JABATAN SUDAH DIUBAH MENJADI ACTIVE PLAYER */}
              <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Active Player / Gamer</span>
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
            <h3 className="faq-question">Bagaimana cara saya menerima pet setelah transaksi?</h3>
            <p className="faq-answer">Setelah pembayaran berhasil, admin akan memberikan sebuah Link. Akses link tersebut untuk bergabung ke dalam Private Room khusus di dalam game. Setelah Anda berada di dalam room, admin akan langsung mengirimkan pet tersebut ke akun Anda melalui fitur Gift!</p>
          </div>

          <div className="faq-card">
            <h3 className="faq-question">Apakah transaksi menggunakan Private Room ini aman?</h3>
            <p className="faq-answer">Tentu saja. Transaksi di dalam Private Room memastikan proses pengiriman via Gift berjalan lancar, aman, dan tanpa gangguan dari pemain lain.</p>
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