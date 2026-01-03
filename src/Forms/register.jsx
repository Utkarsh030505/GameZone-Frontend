import React from 'react';
import axios from "axios";
import "./styles/regstyle.css";
import { Link } from "react-router-dom";


const Register = () => {

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await axios.post("https://gamezone-backend-sbuy.onrender.com/api/auth/register", {
        name,
        email,
        password
      });

      alert("Registration successful");
      window.location.href = "/login";
    } catch {
      alert("User already exists");
    }
  };

  return (
    <div className="register-page">
      <div className="registration-container">
        <h2>Welcome to GameZone 🎮</h2>
  <p className="subtitle">
    Create your account and start your gaming journey
  </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            required
          />

          
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
          />

         
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
          />

          <br /><br />
          <button type="submit">Register</button>
        </form>
        <p className="switch-auth">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
