// const express = require("express");
// const router = express.Router();

// // Importing all service routes
// const authRoutes = require("./authRoutes");
// const recommendationRoutes = require("./recommendationRoutes");
// const videoProcessingRoutes = require("./videoProcessingRoutes");
// const contentRoutes = require("./contentRoutes");

// // Register routes
// router.use("/auth", authRoutes);
// router.use("/recommendation", recommendationRoutes);
// router.use("/video-processing", videoProcessingRoutes);
// router.use("/content", contentRoutes);

// module.exports = router;

// const express = require("express");
// const axios = require("axios");

// const router = express.Router();

// // Define microservice URLs
// const SERVICES = {
//   auth: "http://auth-service:5000",
//   content: "http://content-service:5002",
//   recommendation: "http://recommendation-service:5004",
//   videoProcessing: "http://video-processing-service:5000",
// };

// // Proxy Requests to Microservices
// const proxyRequest = async (req, res, serviceUrl, path) => {
//   try {
//     const response = await axios({
//       method: req.method,
//       url: `${serviceUrl}${path}`,
//       data: req.body,
//     });
//     res.json(response.data);
//   } catch (error) {
//     console.error("Error communicating with microservice:", error.message);
//     res.status(500).json({ error: "Service is unavailable" });
//   }
// };

// // Register Routes for Microservices
// router.use("/auth", (req, res) =>
//   proxyRequest(req, res, SERVICES.auth, req.path)
// );
// router.use("/recommendation", (req, res) =>
//   proxyRequest(req, res, SERVICES.recommendation, req.path)
// );
// router.use("/video-processing", (req, res) =>
//   proxyRequest(req, res, SERVICES.videoProcessing, req.path)
// );
// router.use("/content", (req, res) =>
//   proxyRequest(req, res, SERVICES.content, req.path)
// );

// module.exports = router;

const express = require("express");
const axios = require("axios");

const router = express.Router();
const recommendationRoutes = require("./recommendationRoutes");

// Define microservice URLs
const SERVICES = {
  auth: process.env.AUTH_SERVICE_URL || "http://auth-service:5001",
  content: process.env.CONTENT_SERVICE_URL || "http://content-service:5002",
  recommendation:
    process.env.RECOMMENDATION_SERVICE_URL ||
    "http://recommendation-service:5004",
  videoProcessing:
    process.env.VIDEO_PROCESSING_SERVICE_URL ||
    "http://video-processing-service:5003",
  aiChatbot:
    process.env.AI_CHATBOT_SERVICE_URL ||
    "http://ai-chatbot-service:5005",
};

// Proxy function
const proxyRequest = async (req, res, serviceUrl) => {
  try {
    const response = await axios({
      method: req.method,
      url: `${serviceUrl}${req.path}`,
      data: req,
      headers: {
        ...req.headers, // 🔥 forward original headers (important!)
        // host: undefined,
      },
      responseType: "json",
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(`❌ Error reaching ${serviceUrl}${req.path}:`, error.message);
    res.status(500).json({ error: "Service unavailable" });
  }
};

const proxyRequestUpload = async (req, res, serviceUrl) => {
  console.log("🔥 Proxy Request to:", serviceUrl, req, req.body);
  try {
    const response = await axios({
      method: req.method,
      url: `${serviceUrl}${req.path}`,
      data: req,
      headers: {
        ...req.headers, // 🔥 forward original headers (important!)
      },
      responseType: "json",
      // host: undefined,
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(`❌ Error reaching ${serviceUrl}${req.path}:`, error.message);
    res.status(500).json({ error: "Service unavailable" });
  }
};

// Register Routes
router.use("/auth", (req, res) => proxyRequest(req, res, SERVICES.auth));

// Use the recommendation routes module
router.use("/recommendation", recommendationRoutes);
router.use("/video-processing", (req, res) =>
  proxyRequest(req, res, SERVICES.videoProcessing)
);
// // For content-service - remove "/content" prefix before forwarding
// router.post("/content/upload-video", (req, res) => {
//   const newPath = req.path; // `/upload-metadata`
//   proxyRequestUpload(req, res, SERVICES.content, newPath);
// });

// router.post("/content/upload-metadata", (req, res) =>
//   proxyRequest(req, res, SERVICES.content)
// );

// All other /content routes use proxyRequest (normal JSON)
// router.use("/content", (req, res) => proxyRequest(req, res, SERVICES.content));

router.use("/content", (req, res) => {
  const newPath = req.path; // `/upload-metadata`
  proxyRequestUpload(req, res, SERVICES.content, newPath);
});

// AI Chatbot Routes - Using a specialized handler for the chatbot
router.use("/ai-chatbot", (req, res) => {
  try {
    console.log(`🤖 Forwarding AI chatbot request to ${SERVICES.aiChatbot}${req.path}`);
    
    // For chat requests, specially handle the body to ensure it's formatted correctly
    if (req.path === '/chat' && req.method === 'POST') {
      const requestData = req.body;
      console.log('AI Chatbot request data:', requestData);
      
      // Forward with properly formatted body
      axios({
        method: req.method,
        url: `${SERVICES.aiChatbot}${req.path}`,
        data: requestData,
        headers: {
          'Content-Type': 'application/json',
        },
        responseType: 'json',
      })
      .then(response => {
        console.log('AI Chatbot response received');
        res.status(response.status).json(response.data);
      })
      .catch(error => {
        console.error(`❌ Error communicating with AI Chatbot: ${error.message}`);
        console.error(error.stack);
        // Return a friendly error message
        res.status(200).json({ 
          response: "I'm having trouble connecting right now. Please try again in a moment." 
        });
      });
    } else {
      // For other routes like health checks, use the standard proxy
      proxyRequest(req, res, SERVICES.aiChatbot);
    }
  } catch (error) {
    console.error(`❌ Exception in AI chatbot route: ${error.message}`);
    res.status(200).json({ 
      response: "I'm having trouble processing your request. Please try again." 
    });
  }
});

// Routes
// router.post("/content/upload-video", proxyRequestUpload(SERVICES.content)); // File Upload: Stream Proxy
// router.post("/content/upload-metadata", (req, res) =>
//   proxyRequest(req, res, SERVICES.content)
// ); // Metadata: JSON Proxy
// router.get("/content/videos", (req, res) =>
//   proxyRequest(req, res, SERVICES.content)
// ); // Fetch Videos: JSON Proxy

module.exports = router;
