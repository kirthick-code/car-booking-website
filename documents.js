const express = require("express");
const router = express.Router();
const Document = require("../models/Document");
const authenticateUser = require("../middleware/authenticateUser"); // Middleware to verify JWT

// Get all documents
router.get("/", authenticateUser, async (req, res) => {
  try {
    const documents = await Document.find().sort({ date: -1 }); // latest first
    res.json(documents);
  } catch (err) {
    res.status(500).json({ message: "Error fetching documents", error: err });
  }
});

module.exports = router;
