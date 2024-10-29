import "../index.css";
import React, { useState } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted"); // Check if the function is triggered
    try {
      // Send a POST request to your backend REST API
      const response = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        // Handle successful login, e.g., redirect or save token
      } else {
        console.log("Login failed");
        // Handle login error, e.g., display error message
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="login-container">
      <h2>Divin Log Book</h2>
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
}

export default LoginPage;
