const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const experienceRoutes = require("./routes/experienceRoutes");
const bookingRoutes = require("./routes/bookingRoutes"); // ✅ changed import → require

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/experiences", experienceRoutes);
app.use("/bookings", bookingRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
