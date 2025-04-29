const express = require("express");
const axios = require("axios");
const router = express.Router();

const RECOMMENDATION_SERVICE_URL =
  process.env.RECOMMENDATION_SERVICE_URL ||
  "http://recommendation-service:5004";

router.get("/recommend", async (req, res) => {
  try {
    const response = await axios.get(`${RECOMMENDATION_SERVICE_URL}/recommend`);
    res.json(response.data);
  } catch (error) {
    console.error("❌ Error fetching recommendations:", error);
    res.status(500).json({ message: "Failed to fetch recommendations" });
  }
});

module.exports = router;
