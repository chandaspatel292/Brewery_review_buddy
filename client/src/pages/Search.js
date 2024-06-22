// src/pages/Search.js
import React, { useState, useContext } from "react";
import axios from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import styles from "./Search.module.css";

const Search = () => {
  const [breweries, setBreweries] = useState([]);
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  const { logout } = useContext(AuthContext); // Access logout function
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // Call logout function from AuthContext
      navigate("/");
      window.location.reload(); // Redirect to login page after successful logout
    } catch (error) {
      console.error("Logout error:", error); // Handle potential errors
    }
  };

  const onSearch = async () => {
    if (!city && !name && !type) {
      alert("Please fill in at least one search criterion.");
      return;
    }
    const params = new URLSearchParams();
    if (city) params.append("by_city", city);
    if (name) params.append("by_name", name);
    if (type) params.append("by_type", type);

    try {
      const res = await axios.get(`/breweries/search?${params.toString()}`);
      /* console.log(res.data); */
      setBreweries(res.data);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ marginLeft: "0px" }}>Search Breweries</h2>
        <button
          onClick={handleLogout}
          style={{ marginRight: "20px" }}
          className={styles.button}
        >
          Sign Out
        </button>
      </div>
      <div className={styles.searchSection}>
        <div>Search by city</div>

        <input
          type="text"
          value={city}
          className={styles.inputField}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search by city"
          required
        />
      </div>
      <div className={styles.searchSection}>
        <div>Search by name</div>
        <input
          type="text"
          value={name}
          className={styles.inputField}
          onChange={(e) => setName(e.target.value)}
          placeholder="Search by name"
          required
        />
      </div>
      <div className={styles.searchSection}>
        <div>Search by type</div>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className={styles.selectField}
          placeholder="Select a type"
          required
        >
          <option value="" disabled>
            Select a brewery type
          </option>
          <option value="micro">Micro - Most craft breweries.</option>
          <option value="nano">Nano - An extremely small brewery </option>
          <option value="regional">
            Regional - A regional location of an expanded brewery
          </option>
          <option value="brewpub">
            Brewpub - A beer-focused restaurant/bar
          </option>
          <option value="large">Large - A very large brewery.</option>
          <option value="planning">Planning - A brewery in planning</option>
          <option value="bar">Bar - A simple bar</option>
          <option value="contract">
            Contract - A brewery that uses another brewerys equipment.
          </option>
          <option value="proprietor">
            Proprietor - Similar to contract brewing but refers more to a
            brewery incubator.
          </option>
          <option value="closed">
            Closed - A location which has been closed.
          </option>
        </select>
      </div>
      <div className={styles.searchSection}>
        <button onClick={onSearch} className={styles.button}>
          Search
        </button>
      </div>
      <div>
        <ul className={styles.cardContainer}>
          {breweries.map((brewery) => (
            <li key={brewery.id} className={styles.card}>
              <h3>{brewery.name}</h3>
              <p>
                <b>Type: </b>
                {brewery.brewery_type}
              </p>
              <p>
                {brewery.city}, {brewery.state}
              </p>
              <a href={`/brewery/${brewery.id}`}>
                <button className={styles.button}>View Details</button>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Search;
