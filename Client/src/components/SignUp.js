import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from '../api/axios';
import "./SignUp-Login.css";

const SignUp = () => {
  const navigate = useNavigate(); // to redirect the user after sign up
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); // For handling any errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await axios.post("/users", formData); // Make the API request
      console.log("Signup successful:", response.data);
      navigate("/login"); // Redirect to login page after successful signup
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      setError("Error signing up. Please try again.");
    }
  };

  return (
    <div className="login">
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="user-details"
            type="text"
            name="username"
            placeholder="Enter Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            className="user-details"
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className="user-details"
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="login-button">
            Sign Up
          </button>
        </form>

        {error && <div className="error-message">{error}</div>} {/* Display errors */}

        <p>
          Already have an account?{" "}
          <Link to="/login" className="redirect-page">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
