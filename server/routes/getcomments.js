const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Comment = require("../models/Comment");

router.get("/:blogId", async (req, res) => {
  const blogId = req.params.blogId;
  try {
    const comments = await Comment.find({ blogId });
    if (comments.length === 0) {
      console.log("returning empty");
      return res.json([]);
    }

    const updatedComments = comments.map(async (comment) => {
      const user = await User.findById(comment.userId);
      if (!user) {
        return {
          ...comment,
          profilePicUrl:
            "https://t3.ftcdn.net/jpg/03/58/90/78/360_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg",
          username: "Anonymous",
        };
      }
      return ({
        ...comment._doc,
        profilePicUrl: user.profilePicUrl,
        username: user.username,
      });
    });

		const resolvedComments = await Promise.all(updatedComments);
		console.log(resolvedComments);
    res.json(resolvedComments);
  } catch (error) {
    res.status(500).json({
      message:
        "Some error occured while fetching the comments, please try again later or contact @ojas",
    });
  }
});

module.exports = router;
