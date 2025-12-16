// Backend/routes/generateRoute.js
import express from "express";
import OpenAI from "openai";

const router = express.Router();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // make sure .env is set
});

router.post("/generate-code", async (req, res) => {
  try {
    const { language, prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Create prompt for AI
    const fullPrompt = `
Generate ${language} code based on this description.
Return only the code, no explanations:

${prompt}
    `;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: fullPrompt }],
    });

    const generatedCode = completion.choices[0].message.content;

    res.json({ code: generatedCode });

  } catch (err) {
    console.error("❌ Code Generator Error:", err);
    res.status(500).json({ error: "AI code generation failed", message: err.message });
  }
});

export default router;
