// backend/gemini.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function callGemini(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    return result.response;
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("Failed to generate content from Gemini");
  }
}

module.exports = { callGemini };
