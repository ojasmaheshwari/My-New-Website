import React from "react";
import "./blogcard.css";
import { useNavigate } from "react-router-dom";

const BlogCard = (props) => {
	const content = props.content;
	const address = props.content.address;

  const navigate = useNavigate();

  const openBlog = () => {
		console.log("navigating to", `/blogs/${content._id}`);
    navigate(`/blogs/${content._id}`);
  };
  return (
    <div className="blog-card" onClick={openBlog}>
      <div className="image">
        <img src={content.blogThumbnail} alt="Image for Blog" />
      </div>
      <div className="description">
        <span className="about tert-text">articles</span>
        <h2 className="heading">{content.heading}</h2>
        <p className="description-starting-text">{content.description}</p>
        <span className="description-metadata tert-text">
          {content.timeReqToRead} minutes
        </span>
      </div>
    </div>
  );
};

export default BlogCard;
