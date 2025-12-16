import express from "express";
import { askDoubt, getHistory } from "../controllers/doubtController.js";

const router = express.Router();

router.post("/ask", express.json(), askDoubt);
router.get("/history", getHistory);

export default router;

