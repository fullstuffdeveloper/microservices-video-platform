const express = require("express");
const axios = require("axios");
const router = express.Router();

// Define the AI Chatbot service URL
const AI_CHATBOT_SERVICE_URL = process.env.AI_CHATBOT_SERVICE_URL || "http://ai-chatbot-service:5005";

// Route for health check
router.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${AI_CHATBOT_SERVICE_URL}/`);
    res.json(response.data);
  } catch (error) {
    console.error("Error connecting to AI Chatbot service:", error.message);
    res.status(500).json({ error: "AI Chatbot service unavailable" });
  }
});

// Route for chat endpoint
router.post("/chat", async (req, res) => {
  try {
    console.log("Forwarding chat request to AI Chatbot service", req.body);
    const response = await axios.post(`${AI_CHATBOT_SERVICE_URL}/chat`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error("Error connecting to AI Chatbot service:", error.message);
    res.status(500).json({ error: "AI Chatbot service unavailable" });
  }
});

module.exports = router; 