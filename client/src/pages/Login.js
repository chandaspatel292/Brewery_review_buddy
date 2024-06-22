// src/pages/Login.js
import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
/* import { Link } from "react-router-dom"; */
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      console.log("logged in");

      // Check if user is logged in based on context
      if (user) {
        navigate("/search");
      } else {
        // Handle scenario where login was not successful but did not throw an error
        console.error("Login error: User is not authenticated.");
        // Optionally, you can set a state to show an error message to the user
        // setError("Failed to login. Please check your credentials.");
      }
    } catch (error) {
      // Handle error appropriately, e.g., show a message to the user
      console.error("Login error:", error.message);
      // Optionally, you can set a state to show an error message to the user
      // setError("Failed to login. Please check your credentials.");
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={onSubmit}>
        <h2>Sign In</h2>

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

        {/* <div>
        New User? <Link to="/signup">Signup</Link>
      </div> */}

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Login;
