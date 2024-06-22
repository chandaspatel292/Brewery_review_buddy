// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
/* import Login from "./pages/Login";
import Signup from "./pages/Signup"; */
import Search from "./pages/Search";
import Brewery from "./pages/Brewery";
import SignInOrUp from "./pages/signInOrUp";
import "./styles.css";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<SignInOrUp />} />
          <Route path="/signup" element={<SignInOrUp />} />
          <Route path="/search" element={<Search />} />
          <Route path="/brewery/:id" element={<Brewery />} />
          <Route path="/" element={<SignInOrUp />} /> {/* Default route */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
