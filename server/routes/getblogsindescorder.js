const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

router.get('/', async (req, res) => {
	try {
    const blogs = await Blog.find().sort({ likes: -1 });
		console.log(blogs);
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
		console.log(err);
  }
});

module.exports = router;
