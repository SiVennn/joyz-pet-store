import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("joyz_admin_token");
    if (token === "authenticated_true") setIsAuthenticated(true);
    setLoading(false);
  }, []);

  const login = (username, password) => {
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("joyz_admin_token", "authenticated_true");
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("joyz_admin_token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};