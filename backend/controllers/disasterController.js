// controllers/disasterController.js
import fetch from "node-fetch";
import { generateHazardAnalysis } from "../services/aiService.js";

// Helper function to normalize inputData
const getInputData = (body) => body.inputData || body;

// 🔥 FIRE
export const predictFire = async (req, res) => {
  try {
    console.log("Incoming Fire body:", req.body);

    const response = await fetch(`${process.env.ML_API_URL}/predict/fire`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) throw new Error("Fire ML service failed");

    const result = await response.json();

    const probability = result.fire_probability || 0;
    const probabilityPercent = probability * 100;

    let aiAnalysis = null;

    if (probabilityPercent > 60) {
      const inputData = getInputData(req.body);

      const aiResult = await generateHazardAnalysis({
        hazardType: "Wildfire",
        inputData,
        probability: probabilityPercent.toFixed(2)
      });

      aiAnalysis = aiResult;                // ✅ whole AI object
    }

    res.json({
      ...result,
      probability_percent: probabilityPercent.toFixed(2),
      ai_analysis: aiAnalysis,              // ✅ now contains full analysis
      historical_matches: aiAnalysis?.historical_matches || []   // optional
    });

  } catch (err) {
    console.error("Fire prediction error:", err);
    res.status(500).json({ error: "Fire ML service not responding" });
  }
};

// 🌊 FLOOD
export const predictFlood = async (req, res) => {
  try {
    console.log("Incoming Flood body:", req.body);

    const response = await fetch(`${process.env.ML_API_URL}/predict/flood`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) throw new Error("Flood ML service failed");

    const result = await response.json();

    const probability = result.flood_probability || 0;
    const probabilityPercent = probability * 100;

    let aiAnalysis = null;

    if (probabilityPercent > 60) {
      const inputData = getInputData(req.body);

      const aiResult = await generateHazardAnalysis({
        hazardType: "Flood",
        inputData,
        probability: probabilityPercent.toFixed(2)
      });

      aiAnalysis = aiResult;
    }

    res.json({
      ...result,
      probability_percent: probabilityPercent.toFixed(2),
      ai_analysis: aiAnalysis,
      historical_matches: aiAnalysis?.historical_matches || []
    });

  } catch (err) {
    console.error("Flood prediction error:", err);
    res.status(500).json({ error: "Flood ML service not responding" });
  }
};

// 🌍 EARTHQUAKE
export const predictEarthquake = async (req, res) => {
  try {
    console.log("Incoming Earthquake body:", req.body);

    const response = await fetch(`${process.env.ML_API_URL}/predict/earthquake`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(getInputData(req.body)),
    });

    if (!response.ok) throw new Error("Earthquake ML service failed");

    const result = await response.json();

    const probability = result.earthquake_probability || 0;
    const probabilityPercent = probability * 100;

    let aiAnalysis = null;

    if (probabilityPercent > 60) {
      const inputData = getInputData(req.body);

      const aiResult = await generateHazardAnalysis({
        hazardType: "Earthquake",
        inputData,
        probability: probabilityPercent.toFixed(2)
      });

      aiAnalysis = aiResult;
    }

    res.json({
      ...result,
      probability_percent: probabilityPercent.toFixed(2),
      ai_analysis: aiAnalysis,
      historical_matches: aiAnalysis?.historical_matches || []
    });

  } catch (err) {
    console.error("Earthquake prediction error:", err);
    res.status(500).json({ error: "Earthquake ML service not responding" });
  }
};

export const predictLandslide = async (req, res) => {
  try {
    console.log("Incoming Landslide body:", req.body);

    const response = await fetch(`${process.env.ML_API_URL}/predict/landslide`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) throw new Error("Landslide ML service failed");

    const result = await response.json();

    // Map "Probability" (from FastAPI) to percentage for AI trigger
    const probability = result.Probability || 0;
    const probabilityPercent = probability * 100;

    let aiAnalysis = null;

    if (probabilityPercent > 60) {
      const inputData = getInputData(req.body);

      const aiResult = await generateHazardAnalysis({
        hazardType: "Landslide",
        inputData,
        probability: probabilityPercent.toFixed(2)
      });

      aiAnalysis = aiResult;
    }

    res.json({
      ...result,
      probability_percent: probabilityPercent.toFixed(2),
      ai_analysis: aiAnalysis,
      historical_matches: aiAnalysis?.historical_matches || []
    });

  } catch (err) {
    console.error("Landslide prediction error:", err);
    res.status(500).json({ error: "Landslide ML service not responding" });
  }
};