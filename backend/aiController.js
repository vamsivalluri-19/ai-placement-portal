import OpenAI from "openai";
import { callGemini } from "./gemini.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function generateWelcome(req, res) {
  try {
    const result = await callGemini("Write a welcome message for placement portal");
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function analyzeResume(req, res) {
  try {
    const { resume } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a placement resume evaluator." },
        { role: "user", content: resume }
      ]
    });

    res.json({
      analysis: response.choices[0].message.content
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
