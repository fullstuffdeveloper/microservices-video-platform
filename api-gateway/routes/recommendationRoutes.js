const express = require("express");
const axios = require("axios");
const router = express.Router();

// Define Recommendation service URL
const RECOMMENDATION_SERVICE_URL = process.env.RECOMMENDATION_SERVICE_URL || "http://recommendation-service:5004";
console.log(`✅ Recommendation service URL: ${RECOMMENDATION_SERVICE_URL}`);

// Route for health check
router.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${RECOMMENDATION_SERVICE_URL}/`);
    res.json(response.data);
  } catch (error) {
    console.error("Error connecting to Recommendation service:", error.message);
    res.status(500).json({ error: "Recommendation service unavailable" });
  }
});

// Route for getting recommendations
router.get("/recommend", async (req, res) => {
  try {
    const title = req.query.title || '';
    
    console.log(`🔍 Forwarding recommendation request with title: "${title}"`);
    console.log(`🔗 Request URL: ${RECOMMENDATION_SERVICE_URL}/recommend?title=${encodeURIComponent(title)}`);
    
    // Direct URL construction for debugging
    const requestUrl = `${RECOMMENDATION_SERVICE_URL}/recommend?title=${encodeURIComponent(title)}`;
    
    // Forward with query parameters
    const response = await axios.get(requestUrl);
    
    console.log(`✅ Recommendation response received with ${response.data.length} items`);
    
    // Return the response
    res.json(response.data);
  } catch (error) {
    console.error("❌ Error connecting to Recommendation service:", error.message);
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
    }
    res.status(500).json({ error: "Recommendation service unavailable" });
  }
});

module.exports = router;
