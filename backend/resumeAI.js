import fs from "fs";
import pdf from "pdf-parse";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function analyzePDF(req, res) {
  const dataBuffer = fs.readFileSync(req.file.path);
  const pdfData = await pdf(dataBuffer);

  const ai = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are an HR resume analyzer." },
      { role: "user", content: pdfData.text }
    ]
  });

  res.json({
    analysis: ai.choices[0].message.content
  });
}
