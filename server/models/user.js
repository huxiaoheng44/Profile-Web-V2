const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: String,
    googleid: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
    },
    locale: String,
    picture: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", UserSchema);
