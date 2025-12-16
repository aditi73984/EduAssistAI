import Message from "../models/Message.js";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

// Clean AI output helpers
const cleanText = (t) => (t && typeof t === "string" ? t.trim() : "");

export const askDoubt = async (req, res) => {
  try {
    const userText = cleanText(req.body.text || "");
    if (!userText) return res.status(400).json({ message: "No text provided" });

    // Save user message to DB
    const userMsg = await Message.create({ sender: "user", text: userText });

    // Build prompt for AI (text only)
    const prompt = `User question:\n\n${userText}\n\nPlease answer clearly and step-by-step.`;

    // Call OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5,
      max_tokens: 800
    });

    const aiTextRaw = response.choices?.[0]?.message?.content || "Sorry, I couldn't produce an answer.";
    const aiText = cleanText(aiTextRaw);

    // Save AI message to DB
    const aiMsg = await Message.create({ sender: "ai", text: aiText });

    // Return ai reply and message ids
    return res.json({
      reply: aiText,
      userMessage: userMsg,
      aiMessage: aiMsg
    });
  } catch (err) {
    console.error("askDoubt error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getHistory = async (req, res) => {
  try {
    // return last 200 messages (most recent first)
    const messages = await Message.find().sort({ createdAt: 1 }).limit(200);
    return res.json(messages);
  } catch (err) {
    console.error("getHistory error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};
