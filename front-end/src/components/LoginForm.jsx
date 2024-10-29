import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../index.css";

const LoginForm = () => {
  const { handleLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin(email, password);
      navigate("/Dashboard"); // Redirect to dashboard after successful login
    } catch (error) {
      console.error("Login error", error);
      // Optionally, you can set an error state to display an error message
    }
  };

  return (
    <div className="login-container">
      <h2>Diving Log Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input-field"
          name="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="input-field"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
