import express from "express";
import { getVideos } from "../controllers/videoController.js";
const router = express.Router();

router.get("/", getVideos);

// import express from "express";

// Save video metadata
router.post("/upload-metadata", (req, res) => {
  try {
    const { title, downloadUrl, uploadedBy } = req.body;

    // For now just log and simulate storing it
    console.log("Received Video Metadata:", { title, downloadUrl, uploadedBy });

    // TODO: Save this info to database (optional future enhancement)

    res.status(201).json({ message: "Video metadata received successfully!" });
  } catch (error) {
    console.error("Error receiving metadata:", error);
    res.status(500).json({ message: "Failed to save metadata" });
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
