const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Spotify API routes
app.get("/api/spotify", (req, res) => {
  res.send("Spotify API integration will go here");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
