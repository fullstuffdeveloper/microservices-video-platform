const express = require("express");
const router = express.Router();
const axios = require("axios");

// Auth Service Base URL
const AUTH_SERVICE_URL = "http://auth-service:5000";

router.post("/login", async (req, res) => {
  try {
    const response = await axios.post(`${AUTH_SERVICE_URL}/login`, req.body);
    res.json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Auth Service Error" });
  }
});

module.exports = router;
