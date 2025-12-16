import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  topic: String,
  questions: [
    {
      question: String,
      options: [String],
      answer: String,
    },
  ],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Quiz", quizSchema);
