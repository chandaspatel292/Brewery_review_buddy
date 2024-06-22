const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  searchBreweries,
  getBreweryDetails,
  addReview,
} = require("../controllers/brewery");

router.get("/search", searchBreweries);
router.get("/:id", getBreweryDetails);
router.post("/review", auth, addReview);

module.exports = router;
