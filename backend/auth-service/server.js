import express from "express";

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.get("/", (req, res) => {
//   res.send("Service is running");
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// const express = require("express");
const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

// Test Routes
app.get("/", (req, res) => res.send("Auth Service Running 🚀"));
app.get("/login", (req, res) => res.json({ message: "Login API working!" }));

app.listen(PORT, () => console.log(`✅ Auth Service running on port ${PORT}`));
