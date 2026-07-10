import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { supabase } from "../supabaseClient"; // Mengubungkan ke jembatan Supabase

export default function Products() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        setLoading(true);
        // Mengambil data dari tabel 'products' di Supabase
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("id", { ascending: true });

        if (error) throw error;
        setPets(data); // Memasukkan data dari cloud ke dalam state
      } catch (error) {
        console.error("Gagal mengambil data pet:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  // Tampilan sementara saat website sedang loading mengambil data dari internet
  if (loading) {
    return (
      <div className="home-container" style={{ paddingBottom: "60px", textAlign: "center", marginTop: "100px" }}>
        <h2 className="text-gradient section-title">Loading Voxel Pets...</h2>
      </div>
    );
  }

  return (
    <div className="home-container" style={{ paddingBottom: "60px" }}>
      {/* KHUSUS DAFTAR PRODUK */}
      <section className="products-section" style={{ marginTop: "40px" }}>
        <h2 className="text-gradient section-title">Our Featured Pets</h2>
        <p style={{ color: "#aaa", textAlign: "center", marginBottom: "40px", marginTop: "-10px" }}>
          Pilih pet 3D Voxel terbaik untuk menemani petualangan hebatmu.
        </p>
        
        {/* Grid otomatis me-looping data dari Supabase */}
        <div className="grid-modern">
          {pets.map((pet) => (
            <ProductCard key={pet.id} pet={pet} />
          ))}
        </div>
      </section>
    </div>
  );
}