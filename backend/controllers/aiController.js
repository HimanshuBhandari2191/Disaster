import { generateHazardAnalysis } from "../services/aiService.js";

export const runAIAnalysis = async (req, res) => {
  try {
    const { hazardType, inputData, probability } = req.body;

    if (!hazardType || !inputData || probability === undefined) {
      return res.status(400).json({
        error: "Missing parameters"
      });
    }

    const aiResult = await generateHazardAnalysis({
      hazardType,
      inputData,
      probability
    });

    console.log("🔥 RAW AI RESULT:", aiResult);
    console.log("🔥 AI TEXT:", aiResult.analysis);

    res.json(aiResult);

  } catch (error) {
    console.error("AI Analysis Error:", error);
    res.status(500).json({
      error: "AI processing failed"
    });
  }
};
