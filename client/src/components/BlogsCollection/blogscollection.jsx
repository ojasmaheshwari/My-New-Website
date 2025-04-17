import React, { useEffect } from "react";
import BlogCard from "../BlogCard/blogcard";

const BlogsCollection = (props) => {
  if (!props.collectionData) {
    return null;
  }

  const collectionData = props?.collectionData;
  const blogs = props?.blogs;

  return (
    <>
      <main className="blogscollection-main flex flex-col items-center justify-center my-8 px-4">
        <h1 className="text-2xl">
          {collectionData.heading || "Blog articles"}
        </h1>
        <span className="text-lg text-justify">
          {collectionData.description ||
            "Blog articles about Tech, Life and Culture"}
        </span>
        <div className="blogcards flex flex-wrap justify-center items-center gap-8 my-12">
          {blogs.map((blog, index) => (
            <BlogCard key={index} content={blog} />
          ))}
        </div>
      </main>
    </>
  );
};

export default BlogsCollection;
