import React, { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const BlogCard = (props) => {
  const content = props.content;
  const address = props.content.address;

  const navigate = useNavigate();

  const openBlog = () => {
    console.log("navigating to", `/blogs/${content._id}`);
    navigate(`/blogs/${content._id}`);
  };
  return (
    <Suspense fallback=<Loader />>
      <div
        className="blog-card w-80 flex flex-col justify-center hover:scale-110 transition-all duration-400 shadow-md p-2 rounded-md"
        onClick={openBlog}
      >
        <div className="image h-64 w-[95%]">
          <img
            src={content.blogThumbnail}
            alt="Image for Blog"
            className="w-full h-full rounded-md"
          />
        </div>
        <div className="description my-2 min-h-32">
          <span className="about tert-text text-sm px-2 bg-gray-100 rounded-lg text-center font-thin flex items-center justify-center w-fit">
            articles
          </span>
          <h2 className="heading text-lg mt-2">{content.heading}</h2>
          <p className="description-starting-text text-md">
            {content.description}
          </p>
          <span className="description-metadata tert-text text-sm font-extralight">
            {content.timeReqToRead} minutes read
          </span>
        </div>
      </div>
    </Suspense>
  );
};

export default BlogCard;
