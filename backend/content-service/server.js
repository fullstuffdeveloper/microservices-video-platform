import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// dotenv.config();
// const app = express();
// app.use(cors());
// app.use(express.json());

import videoRoutes from "./routes/videoRoutes.js";
// app.use("/api/videos", videoRoutes);

// const PORT = process.env.PORT || 5002;
// app.listen(PORT, () => console.log(`Content Service running on port ${PORT}`));

// const express = require("express");
const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json()); // <--- Needed for req.body parsing
// Basic Route
app.get("/", (req, res) => {
  res.send("Content Service Running 🚀");
});

// app.get("/content", (req, res) => {
//   res.json({ message: "Content API is working!" });
// });

// Attach your video routes
app.use("/", videoRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
