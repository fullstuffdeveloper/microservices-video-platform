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
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
const app = express();
const PORT = process.env.PORT || 5003;

// Basic Route
app.get("/", (req, res) => {
  res.send("Video Processing Service Running 🚀");
});

app.get("/video-processing", (req, res) => {
  res.json({ message: "Video Processing API is working!" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
