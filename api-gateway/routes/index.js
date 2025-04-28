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
};

// Proxy function
const proxyRequest = async (req, res, serviceUrl) => {
  try {
    const response = await axios({
      method: req.method,
      url: `${serviceUrl}${req.path}`,
      data: req.body,
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
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(`❌ Error reaching ${serviceUrl}${req.path}:`, error.message);
    res.status(500).json({ error: "Service unavailable" });
  }
};

// Register Routes
router.use("/auth", (req, res) => proxyRequest(req, res, SERVICES.auth));
router.use("/recommendation", (req, res) =>
  proxyRequest(req, res, SERVICES.recommendation)
);
router.use("/video-processing", (req, res) =>
  proxyRequest(req, res, SERVICES.videoProcessing)
);
// For content-service - remove "/content" prefix before forwarding
router.use("/content", (req, res) => {
  const newPath = req.path; // `/upload-metadata`
  proxyRequestUpload(req, res, SERVICES.content, newPath);
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
