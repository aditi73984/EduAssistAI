import express from "express";
import multer from "multer";
import cloudinary from "../cloudinary.js";
import FileLink from "../models/FileLink.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto",
    });

    const newFile = new FileLink({
      title: req.body.title,
      link: result.secure_url,
      type: req.file.mimetype.includes("image")
        ? "image"
        : req.file.mimetype.includes("pdf")
        ? "pdf"
        : "other",
    });

    await newFile.save();
    res.json({ message: "Uploaded Successfully", file: newFile });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
