// import mongoose from "mongoose";
// import Course from "../models/Course.js";
// import fs from "fs";
// import path from "path";

// // Create a course (creator uploads assignment pdf at time of course creation)
// // This endpoint expects multipart/form-data with fields: title, description, link, color, creatorId and file 'assignment'
// export const createCourse = async (req, res) => {
//   try {
//     const { title, description, link, color, creatorId } = req.body;
//     let assignmentPdfPath = null;

//     if (req.file) {
//       // save relative path for serving
//       assignmentPdfPath = `/uploads/courses/${req.file.filename}`;
//     }

//     const course = await Course.create({
//       title,
//       description,
//       link,
//       color,
//       creatorId,
//       assignmentPdfPath
//     });

//     return res.json({ message: "Course created", course });
//   } catch (err) {
//     console.error("createCourse error:", err);
//     return res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

// export const getAllCourses = async (req, res) => {
//   try {
//     const courses = await Course.find().sort({ createdAt: -1 });
//     res.json(courses);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // export const getCourseById = async (req, res) => {
// //   try {
// //     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
// //   return res.status(200).json({ message: "This is a default course (no DB)", default: true });
// // }

// // const course = await Course.findById(req.params.id);



// //     if (!course) return res.status(404).json({ message: "Course not found" });
// //     res.json(course);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // };

// export const getCourseById = async (req, res) => {
//   try {
//     const id = req.params.id;

//     // If ID is NOT a MongoDB ObjectId → it's a default course
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(200).json({
//         default: true,
//         message: "This is a default course, no DB data",
//       });
//     }

//     // Otherwise fetch from DB
//     const course = await Course.findById(id);

//     if (!course) {
//       return res.status(404).json({ message: "Course not found" });
//     }

//     res.status(200).json(course);

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

import Course from "../models/Course.js";
import cloudinary from "../cloudinary.js";
import fs from "fs";

// 📌 Add Course
export const addCourse = async (req, res) => {
  try {
    const { title, description, link, color, creatorId } = req.body;

    let pdfUrl = "";
    let pdfPublicId = "";

    // Upload PDF to Cloudinary
    if (req.file) {
      const uploaded = await cloudinary.uploader.upload(req.file.path, {
        folder: "assignments"
      });

      pdfUrl = uploaded.secure_url;
      pdfPublicId = uploaded.public_id;

      fs.unlinkSync(req.file.path); // Remove local file
    }

    const course = await Course.create({
      title,
      description,
      link,
      color,
      creatorId,
      assignmentPdfPath: pdfUrl,
      pdfPublicId
    });

    res.status(201).json({ success: true, course });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 📌 Get All Courses (students + creator)
export const getCourses = async (req, res) => {
  const courses = await Course.find().sort({ createdAt: -1 });
  res.json(courses);
};

// 📌 Get only creator’s added courses
export const getCreatorCourses = async (req, res) => {
  const { creatorId } = req.params;
  const courses = await Course.find({ creatorId });
  res.json(courses);
};

// 📌 Delete Course
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) return res.json({ success: false, msg: "Not found" });

    // Delete PDF from Cloudinary
    if (course.pdfPublicId) {
      await cloudinary.uploader.destroy(course.pdfPublicId);
    }

    // Delete from DB
    await Course.findByIdAndDelete(id);

    res.json({ success: true, msg: "Course deleted" });
  } catch (error) {
    res.json({ success: false, msg: "Error deleting course" });
  }
};
