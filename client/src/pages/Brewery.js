// src/pages/Brewery.js
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import styles from "./Brewery.module.css"; // Ensure you have styles defined for cards

const Brewery = () => {
  const { id } = useParams();
  const [brewery, setBrewery] = useState({});
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(1);
  const [description, setDescription] = useState("");

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBrewery = async () => {
      const res = await axios.get(`/breweries/${id}`);
      setBrewery(res.data);
      setReviews(res.data.reviews);
    };
    fetchBrewery();
  }, [id]);

  const addReview = async () => {
    if (!description) {
      alert("Please write a description");
      return;
    }
    const res = await axios.post("/breweries/review", {
      breweryId: id,
      rating,
      description,
    });
    setReviews([...reviews, res.data]);
    setDescription("");
    setRating(1);
    window.location.reload();
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <div className={styles.header}>
          <button onClick={() => navigate("/search")} className={styles.button}>
            Go Back
          </button>
          <button onClick={handleLogout} className={styles.button}>
            Sign Out
          </button>
        </div>
        <h2>Brewery : {brewery.name}</h2>
        <p>
          <b>Street : </b>
          {brewery.street}
        </p>
        <p>
          <b>Phone : </b>
          {brewery.phone}
        </p>
        <p>
          <b>Website : </b>
          <a href={brewery.website_url}>{brewery.website_url}</a>
        </p>
        <p>
          <b>City : </b>
          {brewery.city}{" "}
        </p>{" "}
        <p>
          <b>State : </b>
          {brewery.state}
        </p>
        <h3>Reviews : </h3>
        <div className={styles.reviewsContainer}>
          {reviews.map((review) => (
            <div key={review._id} className={styles.reviewCard}>
              <p>Rating: {review.rating}</p>
              <p>By: {review.userId.username}</p>
              <p>Review Description : {review.description}</p>
            </div>
          ))}
        </div>
        <div className={styles.addReview}>
          <h3>Add a Review : </h3>
          <div>
            Rating :{" "}
            <select value={rating} onChange={(e) => setRating(e.target.value)}>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p>Your Review : </p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write your review here..."
              rows={6} // Adjust the number of rows as needed
              cols={40} // Adjust the number of columns as needed
            />
          </div>
          <br />

          <div>
            <button onClick={addReview} className={styles.button}>
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brewery;
