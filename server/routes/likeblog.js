const express = require('express');
const router = express.Router();
const authenticateJWT = require('./getprofile').authenticateJWT;
const User = require('../models/User');
const Blog = require('../models/Blog');

router.use(authenticateJWT);
router.post('/', async (req, res) => {
	const blogId = req.body.blogId;
	console.log(req.user_id);
	try{
		let blog = await Blog.findById(blogId);
		const blogLikedBy = blog.blogLikedBy;
		if (blogLikedBy.includes(req.user_id)) {
			return res.status(400).json({
				...blog._doc,
				message: "You cannot like a blog twice"
			});
		}

		blog = await Blog.findByIdAndUpdate(blogId,{
			$inc: {likes: 1},
			$push: {blogLikedBy: req.user_id},
		} ,{ new: true });
		console.log(blog);
		if (!blog) {
			return res.status(404).json({message: "Blog not found"});
		}

		res.json(blog);
	}
	catch(error) {
		res.status(500).json({message: "Some error occured while trying to like the blog, please contact @ojas or try again later"});
		console.log(error);
	}

});

module.exports = router;
