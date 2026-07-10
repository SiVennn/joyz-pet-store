import { Link } from "react-router-dom";

export default function ProductCard({ pet }) {
  return (
    <div className="glass-card product-card-modern">
      <div className="card-image-box">
        <span className={`rarity-tag ${pet.rarity?.toLowerCase()}`}>{pet.rarity}</span>
        <img src={pet.image_url} alt={pet.name} className="card-pet-img" />
      </div>
      
      <div className="card-info-box">
        <h3 className="card-title">{pet.name}</h3>
        <div className="card-meta">
          <span className="card-price">{pet.price}</span>
          <span className="card-rating">⭐ 4.7</span>
        </div>
        
        {/* RECTANGLE BUTTON UNTUK MENUJU DETAIL PRODUCT */}
        <Link to={`/product/${pet.id}`} className="btn-detail-rectangle">
          View Details
        </Link>
      </div>
    </div>
  );
}