import express from "express";
import axios from "axios";

const router = express.Router();

// Universities (using external API like hipolabs)
router.get("/universities", async (req, res) => {
  try {
    const q = req.query.q || "";
    const { data } = await axios.get(`http://universities.hipolabs.com/search?name=${encodeURIComponent(q)}`);
    res.json(data.map(u => ({ name: u.name, country: u.country })));
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch universities" });
  }
});

// Courses (mock for now – can replace with DB later)
router.get("/courses", (req, res) => {
  const all = ["B.Tech", "M.Tech", "B.Sc", "M.Sc", "MBA", "PhD"];
  const q = (req.query.q || "").toLowerCase();
  res.json(all.filter(c => c.toLowerCase().includes(q)));
});

// Streams (mock)
router.get("/streams", (req, res) => {
  const all = ["Computer Science", "Electronics", "Mechanical", "Civil", "AI", "ML", "Cybersecurity"];
  const q = (req.query.q || "").toLowerCase();
  res.json(all.filter(s => s.toLowerCase().includes(q)));
});

export default router;
