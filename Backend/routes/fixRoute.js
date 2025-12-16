import express from "express";
import OpenAI from "openai";

const router = express.Router();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/fix-code", async (req, res) => {
  try {
    const { language, code } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Code is required" });
    }

    const prompt = `
Fix the following ${language} code. 
Correct all errors and return only the fixed code:

${code}
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const fixedCode = completion.choices[0].message.content;

    res.json({ fixed: fixedCode });

  } catch (err) {
    console.error("❌ Fix Code Error:", err);
    res.status(500).json({ error: "AI fixing failed", message: err.message });
  }
});

export default router;
