export default function About() {
  return (
    <div className="home-container" style={{ paddingBottom: "60px" }}>
      {/* KHUSUS PROFIL TOKO */}
      <section className="about-section glass-card" style={{ padding: "40px", margin: "60px 0", lineHeight: "1.8" }}>
        <h2 className="text-gradient section-title" style={{ marginTop: 0, textAlign: "left" }}>About Joyz Pet Store</h2>
        
        <p style={{ color: "#ccc", marginBottom: "20px", textAlign: "justify" }}>
          Joyz Pet Store hadir untuk membantu para pecinta hewan menemukan peliharaan pilihan dengan mudah, aman, dan menyenangkan. Kami menyediakan berbagai pilihan hewan unik dan menarik, mulai dari hewan peliharaan populer hingga koleksi spesial yang cocok untuk menemani aktivitas sehari-hari.
        </p>
        
        <p style={{ color: "#ccc", marginBottom: "30px", textAlign: "justify" }}>
          Dengan komitmen pada kualitas dan kepuasan pelanggan, setiap hewan yang kami tawarkan dipilih dengan perhatian dan informasi yang jelas. Kami percaya bahwa setiap peliharaan dapat menjadi sahabat yang membawa kebahagiaan, keceriaan, dan pengalaman baru bagi pemiliknya.
          Melalui Joyz Pet Store, proses memilih dan membeli peliharaan menjadi lebih praktis karena dapat dilakukan langsung melalui WhatsApp. Kami siap membantu Anda menemukan peliharaan yang paling sesuai dengan kebutuhan dan preferensi Anda.
        </p>
        
        <h3 className="text-gradient" style={{ marginBottom: "15px", fontSize: "1.5rem" }}>Why Choose Us?</h3>
        <ul style={{ color: "#ccc", paddingLeft: "20px", listStyleType: "square" }}>
          <li style={{ marginBottom: "10px" }}>Pilihan peliharaan yang beragam dan menarik.</li>
          <li style={{ marginBottom: "10px" }}>Informasi produk yang jelas dan mudah dipahami.</li>
          <li style={{ marginBottom: "10px" }}>Proses pembelian cepat melalui WhatsApp.</li>
          <li>Pelayanan ramah dan siap membantu pelanggan.</li>
        </ul>
      </section>
    </div>
  );
}