const express = require("express");
const router = express.Router();
const axios = require("axios");

// Content Service Base URL
const CONTENT_SERVICE_URL = "http://content-service:5002";

router.get("/videos", async (req, res) => {
  try {
    const response = await axios.get(`${CONTENT_SERVICE_URL}/videos`);
    res.json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Content Service Error" });
  }
});

module.exports = router;
