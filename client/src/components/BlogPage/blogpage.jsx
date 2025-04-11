import React, { useState, useEffect, useContext } from "react";
import { PopUpContext } from "../PopUp/popupcontext";
import BlogCard from "../BlogCard/blogcard";
import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [popUpData, setPopUpData, isPopUpShown, setIsPopUpShown] =
    useContext(PopUpContext);
  useEffect(() => {
    const fetchAllBlogs = async () => {
      const response = await axios
        .get(`${SERVER_URL}/getblogsindescorder`)
        .catch((error) => {
          setPopUpData({
            heading: "ERROR",
            description:
              error.response?.data?.message ||
              "Some error occured while trying to load public blogs, please contact @ojas or try again later.",
          });
          setIsPopUpShown(true);
          return;
        });
      setBlogs(response.data);
    };

    fetchAllBlogs();
  }, []);
  return (
    <>
      <main className="blogscollection-main">
        <h1>Blog articles</h1>
        <span>Most popular blogs</span>
        <div
          className="blogcards"
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {blogs.map((blog, index) => (
            <BlogCard key={index} content={blog} />
          ))}
        </div>
      </main>
    </>
  );
};

export default BlogPage;
