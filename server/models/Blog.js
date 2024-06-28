const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  speciality: {
    type: String,
    required: true,
  },
  timeReqToRead: {
    type: Number,
    required: true,
  },
  publishDate: {
    type: String,
    required: true,
  },
  blogMarkdownContent: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  comments: {
    type: Number,
    required: true,
  },
	blogThumbnail: {
		type: String,
		required: true,
	},
	blogLikedBy: {
		type: [String],
		required: true,
	},
});

const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;
