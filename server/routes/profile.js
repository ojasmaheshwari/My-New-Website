const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.get('/:username', async (req, res) => {
	const requestedUsername = req.params.username;
	if (requestedUsername) {
		const requestedUser = await User.findOne({username: requestedUsername});
		if (requestedUser) {
			return res.json({
				profileFound: true,
				profile: {
					username: requestedUser.username,
					profilePicUrl: requestedUser.profilePicUrl,
					fullName: requestedUser.fullName,
					about: requestedUser.about,
				}
			});
		}

		return res.status(404).json({message: "User does not exist"});
	}

	res.status(400).json({message: "Username is invalid or empty"});
});

module.exports = router;
