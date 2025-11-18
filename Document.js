const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  ownerName: { type: String, required: true },
  title: { type: String, required: true },
  fileUrl: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Document", documentSchema);
