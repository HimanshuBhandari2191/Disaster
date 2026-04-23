import express from "express";
import { runAIAnalysis } from "../controllers/aiController.js";

const router = express.Router();

router.post("/analyze", runAIAnalysis);

export default router;
