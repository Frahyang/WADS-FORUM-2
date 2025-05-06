import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axios"; // Make sure this path is correct
import "./SignUp-Login.css";

const Login = ({ onLogin }) => { // <-- Accept onLogin as prop
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Check if both email and password are entered
    if (!formData.email || !formData.password) {
      setError("Email and password are required.");
      return;
    }

    try {
      const response = await axios.post("/login", formData);
      console.log("Login success:", response.data);

      // Store JWT token
      localStorage.setItem("authToken", response.data.token);

      // Inform App component that login is successful
      if (onLogin) onLogin(); // <-- Call the callback

      // Navigate to todolist
      navigate("/todolist");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="login">
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="login-button">Login</button>
        </form>

        {error && <div className="error-message">{error}</div>}

        <p>
          Don't have an account?{" "}
          <Link to="/signup" className="redirect-page">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
