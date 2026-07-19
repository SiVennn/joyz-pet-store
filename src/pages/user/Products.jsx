import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { supabase } from "../../supabaseClient"; 

export default function Products() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. FUNGSI UTAMA: Ambil data awal dari Supabase
    const fetchPets = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("id", { ascending: true });

        if (error) throw error;
        setPets(data); 
      } catch (error) {
        console.error("Gagal mengambil data pet:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();

    // 2. FUNGSI REALTIME: Mendengarkan perubahan database secara live
    const productChannel = supabase
      .channel("live-products-changes") // Membuat channel bebas
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "products" }, // Memantau segala event (* = INSERT, UPDATE, DELETE)
        (payload) => {
          console.log("Ada perubahan data secara Realtime!", payload);

          if (payload.eventType === "INSERT") {
            // Jika admin TAMBAH produk, langsung gabungkan ke layar tanpa refresh
            setPets((prev) => [...prev, payload.new]);
          } 
          else if (payload.eventType === "UPDATE") {
            // Jika admin EDIT produk, ganti data yang cocok secara instan
            setPets((prev) => prev.map((item) => (item.id === payload.new.id ? payload.new : item)));
          } 
          else if (payload.eventType === "DELETE") {
            // Jika admin HAPUS produk, hilangkan dari layar secara instan
            setPets((prev) => prev.filter((item) => item.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    // Cleanup: Mematikan radar pendengar saat user pindah ke halaman lain (agar hemat memori)
    return () => {
      supabase.removeChannel(productChannel);
    };
  }, []);

  if (loading) {
    return (
      <div className="home-container" style={{ paddingBottom: "60px", textAlign: "center", marginTop: "100px" }}>
        <h2 className="text-gradient section-title">Loading Voxel Pets...</h2>
      </div>
    );
  }

  return (
    <div className="home-container" style={{ paddingBottom: "60px" }}>
      <section className="products-section" style={{ marginTop: "40px" }}>
        <h2 className="text-gradient section-title">Our Featured Pets</h2>
        <p style={{ color: "#aaa", textAlign: "center", marginBottom: "40px", marginTop: "-10px" }}>
          Pilih pet 3D Voxel terbaik untuk menemani petualangan hebatmu.
        </p>
        
        <div className="grid-modern">
          {pets.map((pet) => (
            <ProductCard key={pet.id} pet={pet} />
          ))}
        </div>
      </section>
    </div>
  );
}