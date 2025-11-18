const express = require("express");
const router = express.Router();
const Owner = require("../models/Owner");
const Booking = require("../models/Booking");
const bcrypt = require("bcrypt");  // For password hashing
const jwt = require("jsonwebtoken"); // For owner authentication

const JWT_SECRET = "your_jwt_secret"; // Change this to a strong secret

// -------------------
// Register Owner
// -------------------
router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, garage, password } = req.body;

    const existingOwner = await Owner.findOne({ email });
    if (existingOwner)
      return res.status(400).json({ message: "Owner already exists" });

    const hashedPassword = await bcrypt.hash(password, 10); // Hash password
    const newOwner = new Owner({ name, email, phone, garage, password: hashedPassword });
    await newOwner.save();

    res.status(201).json({ message: "Owner registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error registering owner", error: err });
  }
});

// -------------------
// Owner Login
// -------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const owner = await Owner.findOne({ email });
    if (!owner) return res.status(400).json({ message: "Owner not found" });

    const isMatch = await bcrypt.compare(password, owner.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    // Generate JWT token
    const token = jwt.sign({ ownerId: owner._id }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err });
  }
});

// -------------------
// Dashboard - Get all bookings
// -------------------
router.get("/dashboard", async (req, res) => {
  try {
    const bookings = await Booking.find(); // You can filter by owner if needed
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching dashboard", error: err });
  }
});

module.exports = router;
