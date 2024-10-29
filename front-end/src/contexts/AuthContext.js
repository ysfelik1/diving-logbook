import React, { createContext, useContext, useState, useEffect } from "react";
import { login } from "../api/authApi";
import { setToken, getToken, clearToken } from "../utils/storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user data from token on load
  useEffect(() => {
    const token = getToken();
    if (token) {
      setUser({ token });
    }
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const data = await login(email, password);
      if (data.token) {
        // Check if token is returned
        setUser(data.user);
        setToken(data.token);
        console.log("User data set:", data.user);
      } else {
        console.error("Login response missing token");
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      throw error;
    }
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
