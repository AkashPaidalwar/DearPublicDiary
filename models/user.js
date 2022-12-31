const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "https://cdn.filestackcontent.com/nthE64btTt2C93wBGZOQ",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
