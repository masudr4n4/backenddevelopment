import { createContext, useContext, useState, useEffect } from "react";
import { getToken, setToken as persistToken } from "../api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(null);

  useEffect(() => {
    setTokenState(getToken());
  }, []);

  function setToken(newToken) {
    persistToken(newToken);
    setTokenState(newToken);
  }

  function logout() {
    persistToken(null);
    setTokenState(null);
  }

  const isLoggedIn = !!token;

  return (
    <AuthContext.Provider value={{ token, isLoggedIn, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
