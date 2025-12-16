// import express from "express";
// import multer from "multer";
// import path from "path";
// import { createCourse, getAllCourses, getCourseById } from "../controllers/courseController.js";

// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(process.cwd(), "uploads", "courses"));
//   },
//   filename: (req, file, cb) => {
//     const unique = Date.now() + "-" + Math.random().toString(36).slice(2,8);
//     const ext = path.extname(file.originalname);
//     cb(null, `${unique}${ext}`);
//   }
// });

// const upload = multer({ storage });

// router.post("/create", upload.single("assignment"), createCourse);
// router.get("/all", getAllCourses);
// router.get("/:id", getCourseById);

// export default router;
import express from "express";
import { upload } from "../middleware/upload.js";
import { addCourse, getCourses, getCreatorCourses, deleteCourse } from "../controllers/courseController.js";

const router = express.Router();

router.post("/add", upload.single("assignmentPdf"), addCourse);
router.get("/all", getCourses);
router.get("/creator/:creatorId", getCreatorCourses);
router.delete("/:id", deleteCourse);

export default router;
