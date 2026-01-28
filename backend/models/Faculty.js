const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  designation: String,
  bio: String,
  profileImage: String
}, { timestamps: true });

module.exports = mongoose.model("Faculty", facultySchema);
