const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const authenticateJWT = require("./getprofile").authenticateJWT;

router.use(authenticateJWT);
router.post("/", async (req, res) => {
	const username = req.body.username;
	console.log(username);
	try {

		const blogs = await Blog.find({ username});
		res.json(blogs);
  } catch (error) {
		console.log(error);
    res
      .status(500)
      .json({
        message:
          "Something went wrong while fetching your blogs, please try again later or contact @ojas",
      });
  }
});

module.exports = router;
