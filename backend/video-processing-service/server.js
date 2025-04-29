// import express from "express";

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.get("/", (req, res) => {
//   res.send("Service is running");
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// const express = require("express");
import express from "express";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 5003;

app.use(cors());
app.use(express.json()); // ✅ Important for parsing JSON body

// Health check
app.get("/", (req, res) => {
  res.send("Video Processing Service Running 🎥");
});

// Process video
app.post("/video-processing/process-video", async (req, res) => {
  try {
    const { title, url, uploadedBy } = req.body;
    console.log("🔧 Processing video...", { title, url, uploadedBy });

    // Simulate heavy work (compression, thumbnail generation, etc.)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("✅ Video processed successfully for:", title);
    res.status(200).json({ message: "Video processed successfully!" });
  } catch (error) {
    console.error("Error processing video:", error);
    res.status(500).json({ message: "Failed to process video" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
