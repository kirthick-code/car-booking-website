const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// ---------------------------------------------------
// 👉 1. Create New Booking (POST)
// ---------------------------------------------------
router.post("/", async (req, res) => {
  try {
    const {
      userName,
      userPhone,
      vehicleType,
      pickupDate,
      dropDate,
      amount,
      paymentId,
      status
    } = req.body;

    const newBooking = new Booking({
      userName,
      userPhone,
      vehicleType,
      pickupDate,
      dropDate,
      amount,
      paymentId,
      status: status || "Paid",
    });

    const savedBooking = await newBooking.save();

    return res.status(201).json({
      success: true,
      message: "Booking stored successfully",
      data: savedBooking,
    });
  } catch (error) {
    console.error("❌ Booking Save Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while saving booking",
    });
  }
});

// ---------------------------------------------------
// 👉 2. Fetch All Bookings (Owner Dashboard)
// ---------------------------------------------------
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      total: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error("❌ Fetch Bookings Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching bookings",
    });
  }
});

// ---------------------------------------------------
// 👉 3. Fetch single booking by ID (OPTIONAL)
// ---------------------------------------------------
router.get("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    return res.status(200).json({ success: true, data: booking });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while fetching booking by ID",
    });
  }
});

// ---------------------------------------------------
// 👉 4. Delete Booking (OPTIONAL – owner use)
// ---------------------------------------------------
router.delete("/:id", async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);

    if (!deletedBooking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    console.error("❌ Delete Booking Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting booking",
    });
  }
});

module.exports = router;
