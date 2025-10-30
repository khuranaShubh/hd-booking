import mongoose from "mongoose";

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

export default mongoose.model("Booking", bookingSchema);
