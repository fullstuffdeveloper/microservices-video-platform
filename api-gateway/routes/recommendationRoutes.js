const express = require("express");
const router = express.Router();
const axios = require("axios");

// Recommendation Service Base URL
const RECOMMENDATION_SERVICE_URL = "http://recommendation-service:5004";

router.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${RECOMMENDATION_SERVICE_URL}/recommend`);
    res.json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(
        error.response?.data || { message: "Recommendation Service Error" }
      );
  }
});

module.exports = router;
