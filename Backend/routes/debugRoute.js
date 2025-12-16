import express from "express";
import OpenAI from "openai";

const router = express.Router();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

router.post("/debug-code", async (req, res) => {
  try {
    const { language, code } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Code missing" });
    }

    const prompt = `
You are an expert ${language} debugger.
Analyze the following code and list ALL issues in bullet points:

${code}
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({
      findings: completion.choices[0].message.content,
    });

  } catch (err) {
    console.error("DebugRoute Error:", err);
    res.status(500).json({ error: "Debugger failed", details: err.message });
  }
});

export default router;
