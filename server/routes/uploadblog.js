const express = require("express");
const router = express.Router();
const authenticateJWT = require("./getprofile").authenticateJWT;
const User = require("../models/User");
const Blog = require("../models/Blog");

router.use(authenticateJWT);
router.post("/", async (req, res) => {
  const blogData = req.body;

  const user = await User.findById(req.user_id);
  const blogToUpload = {
    heading: blogData.heading,
    description: blogData.description,
    blogMarkdownContent: blogData.blogMarkdownContent,
    username: user.username,
    profilePicture: user.profilePicUrl,
    speciality: "general",
    publishDate: new Date().toLocaleDateString(),
    timeReqToRead: "5",
    likes: 0,
    comments: 0,
		blogThumbnail: blogData.blogThumbnail,
		blogLikedBy: []
  };

  const blog = new Blog(blogToUpload);
  blog
    .save()
    .then(() =>
      res.status(200).json({ message: "Your blog was successfully posted." }),
    )
    .catch((error) => {
      res.status(500).json({ message: error });
    });
});

module.exports = router;
