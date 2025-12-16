import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  link: String,
  color: String,
  creatorId: { type: String, required: false }, // store creator identifier
  assignmentPdfPath: { type: String, required: false }, // server path to pdf uploaded by creator
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Course", courseSchema);
