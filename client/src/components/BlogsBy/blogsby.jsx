import React, { useContext, useEffect, useState } from "react";
import "./blogsby.css";
import BlogsCollection from "../BlogsCollection/blogscollection";
import { PopUpContext } from "../PopUp/popupcontext";
import { ProfileContext } from "../../services/ProfileContext";
import fetchProfile from "../../services/fetchprofile";
import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const BlogsBy = () => {
  const [popUpData, setPopUpData, isPopUpShown, setIsPopUpShown] =
    useContext(PopUpContext);
  const [profile, setProfile] = useContext(ProfileContext);
  const [blogs, setBlogs] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const getAllBlogs = async () => {
        const profile = await fetchProfile();
        setProfile(profile);
        try {
          const response = await axios
            .post(
              `${SERVER_URL}/getuserblogs`,
              {
                username: profile?.username,
              },
              {
                withCredentials: true,
              },
            )
            .catch((error) => {
              setPopUpData({
                heading: "ERROR",
                description:
                  error.response?.data?.message ||
                  "Something went wrong while fetching your blogs, please try again later or contact @ojas",
              });
              setIsPopUpShown(true);
            });

          const _blogs = response.data;
					const blogs = _blogs.map(blog => {
						return {
							...blog,
							address: `/blogs/${blog._id}`,
						}
					});
					console.log(blogs);
          setBlogs(blogs);
					setIsLoading(false);
        } catch (error) {
          setPopUpData({
            heading: "ERROR",
            description:
              error.response?.data?.message ||
              "Something went wrong while fetching your blogs, please try again later or contact @ojas",
          });
          setIsPopUpShown(true);
        }
      };
			await getAllBlogs();
    };
		fetchData();
  }, []);

	if (isLoading) {
		return null;
	}

	console.log(blogs);

  return (
    <BlogsCollection
      collectionData={{
        heading: "Your blog articles",
        description: "These are all the blogs you have written in the past",
      }}
      blogs={blogs}
    />
  );
};

export default BlogsBy;
