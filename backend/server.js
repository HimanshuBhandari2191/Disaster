import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import disasterRoutes from "./routes/disasterRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/ai", aiRoutes);
app.use("/api/disaster", disasterRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
