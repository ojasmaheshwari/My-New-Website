import React, { useState, useEffect, useContext, lazy } from "react";
import { PopUpContext } from "../PopUp/popupcontext";
import axios from "axios";
import { Suspense } from "react";
import Loader from "../Loader/Loader";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const BlogCard = lazy(() => import("../BlogCard/blogcard"));

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
      <main className="blogscollection-main flex flex-col justify-center items-center">
        <h1 className="text-2xl">Blog articles</h1>
        <span className="text-lg">Most popular blogs</span>
        <div
          className="blogcards flex justify-center items-center w-full flex-wrap gap-8 my-12"
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
