const express = require("express");
const router = express.Router();
const Blog = require('../models/Blog');

router.get("/:blogId", async (req, res) => {
  const blogId = req.params.blogId;

	try {
		const blog = await Blog.findById(blogId);
		res.status(200).json(blog);
	}
	catch(error) {
		res.status(500).json({message: "This blog doesn't exist."});
	}
});

module.exports = router;
