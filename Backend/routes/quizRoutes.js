
import express from "express";
import { generateQuiz, getAllQuizzes } from "../controllers/quizController.js";

const router = express.Router();

router.post("/quiz/generate", express.json(), generateQuiz); // expects JSON body
router.get("/quiz/all", getAllQuizzes);

export default router;
