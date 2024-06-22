// server.js
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const breweryRoutes = require("./routes/breweries");
const app = express();
require("dotenv").config();

connectDB();
app.use(cors());
app.use(express.json({ extended: false }));

app.use("/api/auth", authRoutes);
app.use("/api/breweries", breweryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
