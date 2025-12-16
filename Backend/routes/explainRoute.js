import express from "express";
import OpenAI from "openai";   

const router = express.Router();

// OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/explain-code", async (req, res) => {
  try {
    const { language, code } = req.body;

    if (!code) {
      return res.status(400).json({ error: "No code provided" });
    }

    const prompt = `
Explain this ${language} code in simple language. 
Break it line by line and also describe the logic:

${code}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",   // or any model you want
      messages: [{ role: "user", content: prompt }],
    });

    const explanation = completion.choices[0].message.content;

    res.json({ explanation });
  } catch (err) {
    console.error("Explain error:", err);
    res.status(500).json({ error: "AI explanation failed" });
  }
});

export default router;
