const express = require("express");
const router = express.Router();
const User = require("../models/User");

const ACCESS_SECRET_TOKEN = process.env.ACCESS_SECRET_TOKEN;

const authenticateJWT = require('./getprofile').authenticateJWT;

router.put("/", authenticateJWT, async (req, res) => {
	const { username, fullName, about, profilePicUrl } = req.body;

  try {
    const updatedUser = await User.updateOne(
      { username },
      { $set: { fullName, about, profilePicUrl } },
    );

		if (!updatedUser.acknowledged) {
			return res.status(404).json({message: "User does not exist"});
		}

		res.status(200).json({message: "Your information was updated successfully"});
  } catch (error) {
    console.log("oh no: ", error);
    res
      .status(500)
      .json({
        message:
          "Something went wrong with the server. Please try again later.",
      });
  }
});

module.exports = router;
