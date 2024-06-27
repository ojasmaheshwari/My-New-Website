const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
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
  profilePicUrl: {
    type: String,
    required: true,
  },
	fullName: {
		type: String,
		required: true,
	},
	about: {
		type: String,
		required: true,
	},
});

const User = mongoose.model("user", userSchema);

module.exports = User;
