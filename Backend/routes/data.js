const express = require("express");
const axios = require("axios");
const router = express.Router();

// Colleges & Universities (using Hipolabs API for global + dummy fallback)
router.get("/universities", async (req, res) => {
  const q = req.query.q;
  try {
    const api = await axios.get(`http://universities.hipolabs.com/search?name=${q}`);
    const results = api.data.map((u) => ({ name: u.name, country: u.country }));
    res.json(results);
  } catch (err) {
    res.json([
      { name: "IIT Kanpur", country: "India" },
      { name: "IIT Delhi", country: "India" },
      { name: "Stanford University", country: "USA" },
      { name: "MIT", country: "USA" },
    ]);
  }
});

// Courses
router.get("/courses", (req, res) => {
  const q = req.query.q?.toLowerCase();
  const list = ["B.Tech", "M.Tech", "B.Sc", "M.Sc", "PhD", "MBA"];
  res.json(list.filter((c) => c.toLowerCase().includes(q)));
});

// Streams
router.get("/streams", (req, res) => {
  const q = req.query.q?.toLowerCase();
  const list = ["Computer Science", "Electrical", "Mechanical", "Civil", "AI", "ML", "Data Science"];
  res.json(list.filter((s) => s.toLowerCase().includes(q)));
});

module.exports = router;
