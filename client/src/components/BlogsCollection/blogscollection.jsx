import React, {useEffect} from "react";
import BlogCard from "../BlogCard/blogcard";
import "./blogscollection.css";

const BlogsCollection = (props) => {
	if (!props.collectionData) {
		return null;
	}

	const collectionData = props?.collectionData;
	const blogs = props?.blogs;

  return (
    <>
      <main className="blogscollection-main">
        <h1>{collectionData.heading || "Blog articles"}</h1>
        <span>
          {collectionData.description ||
            "Blog articles about Tech, Life and Culture"}
        </span>
        <div className="blogcards">
		{blogs.map((blog, index) => (
			<BlogCard key={index} content={blog} />
		))}
        </div>
      </main>
    </>
  );
};

export default BlogsCollection;
