// src/pages/Signup.js
import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
/* import { Link } from "react-router-dom"; */
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { signup } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    signup(username, email, password);
    /* console.log("signedup"); */
    navigate("/search");
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={onSubmit}>
        <h2>Sign Up</h2>

        <input
          type="text"
          name="name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />

        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />

        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />

        <input
          type="password"
          name="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
        />

        {/* <div>
          Existing User? <Link to="/login">Login</Link>
        </div> */}

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
