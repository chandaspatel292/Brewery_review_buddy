const axios = require("axios");
const Review = require("../models/Review");

exports.searchBreweries = async (req, res) => {
  const { by_city, by_name, by_type } = req.query;
  let query = "";
  if (by_city) query += `by_city=${by_city}&`;
  if (by_name) query += `by_name=${by_name}&`;
  if (by_type) query += `by_type=${by_type}&`;

  try {
    const response = await axios.get(
      `https://api.openbrewerydb.org/v1/breweries?${query}`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.getBreweryDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `https://api.openbrewerydb.org/v1/breweries/${id}`
    );
    const reviews = await Review.find({ breweryId: id }).populate(
      "userId",
      "username"
    );
    res.json({ ...response.data, reviews });
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.addReview = async (req, res) => {
  const { breweryId, rating, description } = req.body;
  try {
    const review = new Review({
      breweryId,
      userId: req.user.id,
      rating,
      description,
    });
    await review.save();
    res.json(review);
  } catch (err) {
    res.status(500).send("Server error");
  }
};
