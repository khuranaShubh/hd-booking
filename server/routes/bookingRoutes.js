const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Booking Schema
const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  date: String,
  guests: Number,
  experienceId: String,
  experienceTitle: String,
  experiencePrice: Number,
  experienceLocation: String,
});

const Booking = mongoose.model("Booking", bookingSchema);

// POST route — save booking
router.post("/", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ message: "✅ Booking saved successfully!", booking });
  } catch (error) {
    console.error("❌ Error saving booking:", error);
    res.status(500).json({ error: "Failed to save booking" });
  }
});

// GET route — get all bookings (optional)
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

module.exports = router;
