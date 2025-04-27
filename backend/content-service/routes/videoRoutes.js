import express from "express";
import { getVideos } from "../controllers/videoController.js";
import axios from "axios";

const router = express.Router();

router.get("/", getVideos);

// import express from "express";

// Save video metadata
router.post("/upload-metadata", async (req, res) => {
  try {
    const { title, url, uploadedBy } = req.body;

    // For now just log and simulate storing it
    console.log("Received Video Metadata:", { title, url, uploadedBy });

    // TODO: Save this info to database (optional future enhancement)
    // 2. Call Video Processing Service
    await axios.post(
      "http://video-processing-service:5003/video-processing/process-video",
      {
        title,
        url,
        uploadedBy,
      }
    );
    res
      .status(201)
      .json({ message: "Video metadata received and processing started!" });
  } catch (error) {
    console.error("Error saving metadata or starting processing:", error);
    res
      .status(500)
      .json({ message: "Failed to save metadata or start processing" });
  }
});

// Fetch all videos (if needed in the future)
router.get("/videos", async (req, res) => {
  try {
    // [Optional Future] Fetch videos from database here.
    res.status(200).json({ message: "Fetching videos - not implemented yet." });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch videos." });
  }
});

export default router;
