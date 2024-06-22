// src/context/AuthContext.js
import React, { createContext, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const AuthContext = createContext();
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = Cookies.get("token");
    return token ? jwtDecode(token) : null;
  });

  const login = async (email, password) => {
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      const token = res.data.token;
      Cookies.set("token", token, { expires: 7 }); // Cookie expires in 7 days
      setUser(jwtDecode(token));

      window.location.href = "/search";
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const signup = async (username, email, password) => {
    try {
      const res = await axios.post("/api/auth/signup", {
        username,
        email,
        password,
      });
      const token = res.data.token;
      Cookies.set("token", token, { expires: 7 }); // Cookie expires in 7 days
      setUser(jwtDecode(token));
    } catch (error) {
      console.error("Signup failed:", error);
      // Handle error (e.g., show error message)
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
