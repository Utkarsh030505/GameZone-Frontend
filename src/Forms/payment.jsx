import React, { useState } from "react";
import axios from "axios";
import "./styles/payment.css";
import { useNavigate } from "react-router-dom";

function Payment() {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [membership, setMembership] = useState("gold");

  const user = JSON.parse(localStorage.getItem("user"));
const navigate = useNavigate();

  const handlePayment = async (e) => {
    e.preventDefault();

   if (!user) {
  alert("Please login before making a payment");
  navigate("/login");   // redirect user
  return;
}

    // Set amount based on plan
    const priceMap = {
      silver: 4.99,
      gold: 9.99,
      diamond: 14.99
    };

    const amount = priceMap[membership];

    try {
      await axios.post("https://gamezone-backend-sbuy.onrender.com/api/subscription/subscribe", {
        user_id: user.id,
        plan: membership,
        amount: amount
      });

      alert("Payment successful. Subscription activated!");
      window.location.href = "/";
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed");
    }
  };

  return (
    <div className="payment-page">
    <div className="login-container">
      <h2>Payment Form</h2>

      <form onSubmit={handlePayment}>
        <label htmlFor="name">Name:</label><br />
        <input 
          type="text" 
          id="name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name" 
          required 
        /><br />

        <label htmlFor="cardNumber">Card Number:</label><br />
        <input 
          type="text" 
          id="cardNumber" 
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="Enter your card number" 
          required 
        /><br />

        <label htmlFor="cvv">CVV:</label><br />
        <input 
          type="text" 
          id="cvv" 
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          placeholder="Enter CVV" 
          required 
        /><br />

        <label htmlFor="membership">Membership Level:</label><br />
        <select 
          id="membership" 
          value={membership}
          onChange={(e) => setMembership(e.target.value)}
          required
        >
           <option value="silver">Silver</option>
          <option value="gold">Gold</option>
          <option value="diamond">Diamond</option>
        </select><br />

        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
  );
}

export default Payment;
