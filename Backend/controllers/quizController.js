import Quiz from "../models/Quiz.js";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

// Clean AI output (strip markdown fences)
const cleanJSON = (text) => {
  if (!text || typeof text !== "string") return text;
  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
};

export const generateQuiz = async (req, res) => {
  try {
    const inputText = (req.body.text || "").toString().trim();

    if (!inputText) {
      return res.status(400).json({ message: "No input text found! Send 'text' in the body." });
    }

    // Ask the model to produce exactly 20 MCQs in JSON format
    const prompt = `Generate exactly 20 multiple choice questions (MCQs) from the content below.
Return ONLY a JSON array (no markdown, no commentary). Each item must be:
{
  "question": "<question text>",
  "options": ["opt1","opt2","opt3","opt4"],
  "answer": "<the correct option text>"
}
Make sure each question has 4 options. Content:
${inputText}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
      max_tokens: 2500
    });

    const raw = response.choices?.[0]?.message?.content;
    if (!raw) throw new Error("No response from AI");

    const cleaned = cleanJSON(raw);

    let quizData;
    try {
      quizData = JSON.parse(cleaned);
    } catch (err) {
      // return AI text for debugging if parsing fails
      console.error("AI raw output (parsing failed):", raw);
      throw new Error("AI returned non-JSON output. Check server logs for raw output.");
    }

    // Basic validation: make sure it's an array and has 20 items
    if (!Array.isArray(quizData) || quizData.length < 1) {
      throw new Error("Parsed quiz data is not an array");
    }

    // Save to DB
    const quiz = await Quiz.create({
      topic: req.body.topic || (inputText.slice(0, 60) + (inputText.length > 60 ? "..." : "")),
      questions: quizData
    });

    // Return quiz data and id
    return res.json({
      message: "Quiz generated successfully",
      quizId: quiz._id,
      quiz: quizData
    });

  } catch (err) {
    console.error("Quiz error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().sort({ createdAt: -1 });
    res.json(quizzes);
  } catch (err) {
    console.error("Fetch quizzes error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
