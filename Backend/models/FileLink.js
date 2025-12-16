import mongoose from "mongoose";

const FileLinkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
  type: { type: String, enum: ["image", "pdf", "video", "other"], default: "other" },
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model("FileLink", FileLinkSchema);
