const express = require('express');
const router = express.Router();
const authenticateJWT = require('./getprofile').authenticateJWT;
const Comment = require('../models/Comment');

const formatDate = date => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

router.use(authenticateJWT);
router.post('/', (req, res) => {
	const commentData = req.body.commentData;
	console.log("comment data", commentData);

	const comment = new Comment({
		...commentData,
		userId: req.user_id,
		timePosted: new Date().toLocaleString(),
	});
	
	comment
    .save()
    .then(() =>
      res.status(200).json({ message: "Your comment was successfully posted." }),
    )
    .catch((error) => {
      res.status(500).json({ message: error });
    });
	
});

module.exports = router;
