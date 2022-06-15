const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  // token: {
  //     type: String,
  //     required: true,
  //     select: false
  // },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const userModel = mongoose.model("user", userSchema);
//op 1:
module.exports = { userModel };
//op 2:
// module.exports.userModel=userModel;
