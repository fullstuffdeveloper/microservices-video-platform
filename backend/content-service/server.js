import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

import videoRoutes from "./routes/videoRoutes.js";
app.use("/api/videos", videoRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Content Service running on port ${PORT}`));
