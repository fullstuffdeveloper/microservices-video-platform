require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const routes = require("./routes"); // Importing all routes

// import all the middleware
// const { authMiddleware, errorHandler, requestLogger } = require("./middleware");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev")); // Logs requests

// Register Routes
app.use("/api", routes);

// Use Middleware
// app.use(requestLogger); // Logs all requests
// app.use(authMiddleware); // Protects APIs
// app.use(errorHandler); // Handles errors

app.get("/", (req, res) => {
  res.send("API Gateway is running 🚀");
});

app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.originalUrl}`);
  next();
});

// Attach Content Service Routes
// app.use("/content", contentRoutes); // ✅ Make it '/content'

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 API Gateway running on port ${PORT}`));

// // Register Routes
// app.use("/api/telephony", telephonyRoutes);
// app.use("/api/ai", aiRoutes);
// app.use("/api/transcription", transcriptionRoutes);
// app.use("/api/notifications", notificationRoutes);
