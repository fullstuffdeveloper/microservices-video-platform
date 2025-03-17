const express = require("express");
const router = express.Router();
const axios = require("axios");

// Video Processing Service Base URL
const VIDEO_PROCESSING_SERVICE_URL = "http://video-processing-service:5000";

router.post("/process", async (req, res) => {
  try {
    const response = await axios.post(
      `${VIDEO_PROCESSING_SERVICE_URL}/process`,
      req.body
    );
    res.json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Video Processing Error" });
  }
});

module.exports = router;
