const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.cookie('jwt', '', {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: 'Strict',
		expires: new Date(0),
	});
	res.json({message: "Logged out successfully"});
});

module.exports = router;
