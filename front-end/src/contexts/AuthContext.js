import React, { createContext, useContext, useState, useEffect } from "react";
import { login } from "../api/authApi";
import { setToken, getToken, clearToken } from "../utils/storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user data from token on initial load
  useEffect(() => {
    const token = getToken();
    if (token) {
      // Optional: decode token to get user info if available, or call an API to fetch user data
      setUser({ token }); // Here, you could set more user data if available.
    }
  }, []);

  const handleLogin = async (email, password) => {
    const data = await login(email, password);
    setUser(data.user);
    setToken(data.token);
  };

  const handleLogout = () => {
    setUser(null);
    clearToken();
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
