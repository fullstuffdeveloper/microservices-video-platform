const express = require("express");
const router = express.Router();

// Importing all service routes
const authRoutes = require("./authRoutes");
const recommendationRoutes = require("./recommendationRoutes");
const videoProcessingRoutes = require("./videoProcessingRoutes");
const contentRoutes = require("./contentRoutes");

// Register routes
router.use("/auth", authRoutes);
router.use("/recommendation", recommendationRoutes);
router.use("/video-processing", videoProcessingRoutes);
router.use("/content", contentRoutes);

module.exports = router;
