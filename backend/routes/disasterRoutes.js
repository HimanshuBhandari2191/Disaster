import express from "express";
import {
  predictFire,
  predictFlood,
  predictEarthquake,
  predictLandslide // 1. Import new controller
} from "../controllers/disasterController.js";

const router = express.Router();

router.post("/fire", predictFire);
router.post("/flood", predictFlood);
router.post("/earthquake", predictEarthquake);
router.post("/landslide", predictLandslide); // 2. Add route

export default router;