const express = require("express");
const Experience = require("../models/experienceModel");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: "Error fetching experiences" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.json(experience);
  } catch (error) {
    res.status(500).json({ message: "Error fetching experience" });
  }
});

module.exports = router;
