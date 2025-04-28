import express from "express";
import { getVideos } from "../controllers/videoController.js";
import axios from "axios";
import admin from "firebase-admin";
import { db } from "../src/firebaseAdmin.js"; // Adjust if needed

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
    // Save into Firestore
    const videosCollection = db.collection("videos"); // Collection name: videos
    await videosCollection.add({
      title,
      url,
      uploadedBy,
      createdAt: new Date(),
    });

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
// Fetch all uploaded videos
router.get("/videos", async (req, res) => {
  // Fetch videos from Firestore
  console.log("Fetching videos from Firestore...");
  try {
    const videosRef = db.collection("videos");
    const snapshot = await videosRef.orderBy("createdAt", "desc").get();

    const videos = [];
    snapshot.forEach((doc) => {
      videos.push({ id: doc.id, ...doc.data() });
    });
    console.log("Fetched videos:", videos);
    // const mockVideos = [
    //   {
    //     title: "First Uploaded Video",
    //     url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    //   },
    //   {
    //     title: "Second Uploaded Video",
    //     url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    //   },
    // ];
    // res.status(200).json(mockVideos);
    res.status(200).json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ message: "Failed to fetch videos" });
  }
});

export default router;
