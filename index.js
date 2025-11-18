// index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Import Routes
const userRoutes = require("./routes/user");
const ownerRoutes = require("./routes/owner");
const bookingRoutes = require("./routes/Booking");
  // ⬅ NEW ADDED

app.use("/api/user", userRoutes);
app.use("/api/owner", ownerRoutes);
app.use("/api/booking", bookingRoutes);  // ⬅ NEW ADDED

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
