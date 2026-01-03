import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./styles/loginstyle.css";

function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await axios.post(
        "https://gamezone-backend-sbuy.onrender.com/api/auth/login",
        { email, password }
      );

      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");

    } catch (err) {
      if (err.response?.status === 404) {
        setError("Email not registered. Please create an account.");
      } else if (err.response?.status === 401) {
        setError("Incorrect password. Please try again.");
      } else {
        setError("Something went wrong. Try again later.");
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Welcome Back 👋</h2>
        <p className="subtitle">Login to continue to GameZone</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />

          <button type="submit">Login</button>
        </form>

        {/* Error Message */}
        {error && (
          <p className="error-text">
            {error}
            {error.includes("register")}
          </p>
        )}

        <p className="switch-auth">
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
