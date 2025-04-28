import express from "express";
import { getVideos } from "../controllers/videoController.js";
import axios from "axios";
import admin from "firebase-admin";
import { db } from "../src/firebaseAdmin.js"; // Adjust if needed
import multer from "multer";
import { getStorage } from "firebase-admin/storage";
const upload = multer({ storage: multer.memoryStorage() }); // Store in memory temporarily

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

// Upload video through backend
router.post("/upload-video", upload.single("video"), async (req, res) => {
  console.log("Received video upload request", req, req.body);
  try {
    const { title, uploadedBy } = req.body;
    const file = req.file;
    console.log("File:", file);
    console.log("Title:", title);
    console.log("Uploaded By:", uploadedBy);

    if (!file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const bucket = getStorage().bucket();
    const fileName = `videos/${Date.now()}_${file.originalname}`;
    const fileUpload = bucket.file(fileName);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype || "video/mp4",
      },
    });

    blobStream.on("error", (error) => {
      console.error("BlobStream Error:", error);
      res.status(500).json({ message: "Failed to upload video." });
    });

    blobStream.on("finish", async () => {
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
        bucket.name
      }/o/${encodeURIComponent(fileUpload.name)}?alt=media`;

      // Save metadata into Firestore
      await db.collection("videos").add({
        title,
        url: publicUrl,
        uploadedBy,
        createdAt: new Date(),
      });

      res
        .status(201)
        .json({ message: "Video uploaded successfully!", url: publicUrl });
    });

    blobStream.end(file.buffer);
  } catch (error) {
    console.error("Error in upload-video:", error);
    res.status(500).json({ message: "Server error while uploading video." });
  }
});

export default router;
