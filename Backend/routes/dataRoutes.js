import express from "express";
import axios from "axios";

const router = express.Router();

// ✅ Get list of colleges/universities (using Hipolabs free API)
router.get("/universities", async (req, res) => {
  try {
    const q = req.query.q || "india";
    const response = await axios.get(
      `http://universities.hipolabs.com/search?country=India&name=${encodeURIComponent(q)}`
    );
    res.json(response.data.map((u) => ({ name: u.name, country: u.country })));
  } catch (err) {
    console.error("College fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch colleges" });
  }
});

// ✅ Courses API — using Data.gov or fallback static list
router.get("/courses", async (req, res) => {
  try {
    const data = [
      "B.Tech", "M.Tech", "MBA", "B.Sc", "M.Sc",
      "BCA", "MCA", "BBA", "PhD", "B.Com", "M.Com",
    ];
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
});

// ✅ Streams API
router.get("/streams", async (req, res) => {
  try {
    const data = [
      "Computer Science", "Information Technology",
      "Artificial Intelligence", "Cybersecurity",
      "Data Science", "Machine Learning",
      "Electronics", "Mechanical", "Civil", "Electrical",
    ];
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch streams" });
  }
});

// ✅ Interests API
router.get("/interests", async (req, res) => {
  try {
    const data = [
      "AI Projects", "Coding Challenges", "Hackathons",
      "Cloud Computing", "Web Development",
      "Blockchain", "Machine Learning",
      "AR/VR", "Game Development", "Open Source",
    ];
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch interests" });
  }
});

// ✅ Subject Specialists (for creator)
router.get("/subjects", async (req, res) => {
  try {
    const data = [
      "Artificial Intelligence", "Data Structures", "DBMS",
      "Networking", "Cybersecurity", "Operating Systems",
      "Machine Learning", "Deep Learning", "Software Engineering",
      "Computer Vision", "Natural Language Processing",
    ];
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch subjects" });
  }
});

export default router;
