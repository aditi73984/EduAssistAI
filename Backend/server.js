import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import uploadRoutes from "./routes/upload.js";
import searchRoutes from "./routes/search.js";
import dataRoutes from "./routes/dataRoutes.js";
import { fileURLToPath } from "url";
import fixRoute from "./routes/fixRoute.js";  // MUST be EXACT
import explainRoute from "./routes/explainRoute.js";
import generateRoute from "./routes/generateRoute.js";
import debugRoute from "./routes/debugRoute.js";
import quizRoutes from "./routes/quizRoutes.js";


import doubtRoutes from "./routes/doubtRoutes.js";

import courseRoutes from "./routes/courseRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

app.use(express.json());


// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected..."))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));


app.use("/auth", authRoutes);

app.use("/api", quizRoutes);

app.use("/api", searchRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api", dataRoutes);
app.use("/api", explainRoute);
app.use("/api", fixRoute);
app.use("/api", generateRoute);
app.use("/api", debugRoute);

app.use("/api/doubt", doubtRoutes);


// after dotenv, express, cors, body parser and mongoose setup:
app.use("/api/courses", courseRoutes);



// serve tmp files created by TTS
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// // serve tmp files created by TTS
// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// app.use("/tmp", express.static(path.join(__dirname, "tmp")));

// Root
app.get("/", (req, res) => res.send("🚀 EduAssistAI Backend Running"));







// Run any code (Python, JS, C, C++)
app.post("/run", async (req, res) => {
  const { code, language } = req.body;
  if (!code || !language) return res.status(400).json({ output: "Code or language missing" });

  // Temp file setup
  let filename;
  let command;

  switch (language.toLowerCase()) {
    case "python":
      filename = path.join(__dirname, "temp.py");
      fs.writeFileSync(filename, code);
      command = `python "${filename}"`;
      break;

    case "javascript":
      filename = path.join(__dirname, "temp.js");
      fs.writeFileSync(filename, code);
      command = `node "${filename}"`;
      break;

    case "c":
      filename = path.join(__dirname, "temp.c");
      fs.writeFileSync(filename, code);
      command = `gcc "${filename}" -o tempC && ./tempC`;
      break;

    case "cpp":
    case "c++":
      filename = path.join(__dirname, "temp.cpp");
      fs.writeFileSync(filename, code);
      command = `g++ "${filename}" -o tempCpp && ./tempCpp`;
      break;

    default:
      return res.status(400).json({ output: "Unsupported language" });
  }

  // Execute code with 5 sec timeout
  exec(command, { timeout: 5000 }, (error, stdout, stderr) => {
    // Delete temp files
    try { fs.unlinkSync(filename); } catch {}
    if (language.toLowerCase() === "c") try { fs.unlinkSync("tempC"); } catch {}
    if (language.toLowerCase() === "cpp") try { fs.unlinkSync("tempCpp"); } catch {}

    if (error) return res.json({ output: stderr || error.message });
    res.json({ output: stdout || "No output" });
  });
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
