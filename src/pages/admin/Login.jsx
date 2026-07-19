import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      navigate("/admin/dashboard");
    } else {
      setError("Username atau Password salah!");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#0b0f19" }}>
      <div style={{ backgroundColor: "#111827", padding: "40px", borderRadius: "12px", border: "1px solid #1f2937", width: "100%", maxWidth: "400px", boxShadow: "0 10px 25px rgba(0,0,0,0.5)" }}>
        <h2 style={{ color: "white", textAlign: "center", marginBottom: "10px", fontSize: "26px" }}>Admin Joyz</h2>
        <p style={{ color: "#6b7280", textAlign: "center", marginBottom: "30px", fontSize: "14px" }}>Silakan masuk untuk mengelola katalog pet</p>
        
        {error && <div style={{ backgroundColor: "#fef2f2", color: "#ef4444", padding: "10px", borderRadius: "6px", marginBottom: "20px", fontSize: "14px", textAlign: "center", fontWeight: "600" }}>{error}</div>}
        
        <form onSubmit={handleFormSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", color: "#94a3b8", marginBottom: "8px", fontSize: "14px" }}>Username</label>
            <input 
              type="text" 
              className="admin-input"
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required
              style={{ width: "100%", padding: "12px", borderRadius: "6px", backgroundColor: "#1f2937", border: "1px solid #374151", color: "white", outline: "none" }}
            />
          </div>
          
          <div style={{ marginBottom: "30px" }}>
            <label style={{ display: "block", color: "#94a3b8", marginBottom: "8px", fontSize: "14px" }}>Password</label>
            <input 
              type="password" 
              className="admin-input"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
              style={{ width: "100%", padding: "12px", borderRadius: "6px", backgroundColor: "#1f2937", border: "1px solid #374151", color: "white", outline: "none" }}
            />
          </div>
          
          <button 
            type="submit" 
            style={{ width: "100%", padding: "14px", backgroundColor: "#0284c7", color: "white", border: "none", borderRadius: "6px", fontWeight: "bold", fontSize: "16px", cursor: "pointer", transition: "0.2s" }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#0369a1"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#0284c7"}
          >
            Masuk Ke Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}