import ai from "../config/gemini.js";

export const generateHazardAnalysis = async ({ hazardType, inputData, probability }) => {
  try {
    console.log("🔍 Received Data:", hazardType, inputData, probability);

    if (!hazardType || !inputData || probability === undefined) {
      throw new Error("Missing required parameters");
    }

    const formattedInputs = Object.entries(inputData)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");

    const prompt = `
You are an advanced disaster analysis AI.

Analyze the data and respond ONLY in valid JSON format.
Do NOT include markdown formatting.
by using longitutde and latitude find the locaation and then find the historical data of that location and then find the matches with the current data and then give the analysis based on that indormation.

Return EXACTLY this structure:

{
  "severity": "",
  "risk_level": "",
  "explanation": "",
  "precautions_authorities": [],
  "precautions_civilians": [],
  "historical_matches": []
}

Hazard Type: ${hazardType}
Risk Probability: ${probability}%

Sensor Data:
${formattedInputs}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt
    });

    const rawText = response.text;
    console.log("🔥 RAW GEMINI TEXT:", rawText);

    const cleanText = rawText.replace(/```json|```/g, "").trim();

    try {
      return JSON.parse(cleanText);
    } catch (parseError) {
      console.error("❌ JSON Parse Error:", parseError);
      return {
        severity: "Unknown",
        risk_level: "Unknown",
        explanation: cleanText,
        precautions_authorities: [],
        precautions_civilians: [],
        historical_matches: []
      };
    }

  } catch (error) {
    console.error("🔥 Gemini Service Error:", error);
    return {
      severity: "Unavailable",
      risk_level: "Unavailable",
      explanation: "AI analysis unavailable",
      precautions_authorities: [],
      precautions_civilians: [],
      historical_matches: []
    };
  }
};