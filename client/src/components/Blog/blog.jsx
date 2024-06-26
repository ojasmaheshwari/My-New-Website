import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { PiHandsClapping } from "react-icons/pi";
import { FaRegComment } from "react-icons/fa";
import { CiBookmarkPlus, CiShare1 } from "react-icons/ci";
import { PopUpContext } from "../PopUp/popupcontext";
import { marked } from "marked";
import axios from "axios";

import "./blog.css";
import CommentSection from "../CommentSection/commentsection";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const Blog = () => {
  const params = useParams();
  const requestedBlog = params.blog;

  const [blogId, setBlogId] = useState("");
  const [blogHeading, setBlogHeading] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [blogUsername, setBlogUsername] = useState("");
  const [blogProfilePicUrl, setBlogProfilePicUrl] = useState("");
  const [blogSpecialisation, setBlogSpecialisation] = useState("");
  const [blogReadTime, setBlogReadTime] = useState("");
  const [blogDate, setBlogDate] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogLikes, setBlogLikes] = useState(0);
  const [blogComments, setBlogComments] = useState(0);
  const [blogExist, setBlogExist] = useState(false);

  const [popUpData, setPopUpData, isPopUpShown, setIsPopUpShown] =
    useContext(PopUpContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = (
          await axios.get(`${SERVER_URL}/blog/${requestedBlog}`)
        ).data;
        console.log(response);
        setBlogId(response._id);
        setBlogHeading(response.heading);
        setBlogDescription(response.description);
        setBlogUsername(response.username);
        setBlogSpecialisation(response.speciality);
        setBlogReadTime(response.timeReqToRead);
        setBlogDate(response.publishDate);
        setBlogLikes(response.likes);
        setBlogComments(response.comments);
        setBlogContent(marked(response.blogMarkdownContent));
        setBlogExist(true);

				const userResponse = await axios.get(`${SERVER_URL}/profile/${response.username}`);
				setBlogProfilePicUrl(userResponse.data.profile.profilePicUrl);
      } catch (error) {
        const errorCode = error.response?.status;
				console.log(error);
        if (errorCode == 404) {
          setBlogHeading("Blog doesn't exist");
          setBlogDescription(
            "The blog you are trying to find may have been deleted or never existed.",
          );
        }
      }
    };

    fetchData();
  }, []);

  const likeBlog = async () => {
    try {
      const response = await axios
        .post(
          `${SERVER_URL}/likeblog`,
          {
            blogId,
          },
          {
            withCredentials: true,
          },
        )
        .then((response) => {
          setBlogLikes(response?.data?.likes);
        })
        .catch((error) => {
          setPopUpData({
            heading: "ERROR",
            description:
              error.response?.data?.message ||
              "Some error occured, please try again after some time or contact @ojas if error persists",
          });
          setIsPopUpShown(true);
					console.log("frome rror", error?.response?.data);
          setBlogLikes(error?.response?.data?.likes);
        });
    } catch (error) {
      setPopUpData({
        heading: "ERROR",
        description:
          error.response?.data?.message ||
          "Some error occured, please try after some time or contact @ojas if error persists",
      });
      setIsPopUpShown(true);
      console.log(error);
    }
  };

	if (!blogId) {
		return null;
	}

  return (
    <main className="blog-main">
      <h1 className="blog-heading">{blogHeading}</h1>
      <h2 className="blog-about">{blogDescription}</h2>
      <div
        className="blog-from"
        style={{
          display: blogExist ? "flex" : "none",
        }}
      >
        <img
          src={blogProfilePicUrl}
          alt="profile pic"
          className="blog-profile-pic"
        />
        <div className="blog-labels-wrapper">
          <div className="blog-label-1">
            <span>
              <Link to={`/profile/${blogUsername}`}>{blogUsername}</Link>
            </span>
          </div>
          <div className="blog-label-2">
            Published in{" "}
            <span className="blog-specialisation">{blogSpecialisation}</span> .{" "}
            {blogReadTime} read . {blogDate}
          </div>
        </div>
      </div>
      <div
        className="blog-actions"
        style={{
          display: blogExist ? "flex" : "none",
        }}
      >
        <div className="blog-actions-1">
          <div className="blog-likes-icon">
            <PiHandsClapping onClick={likeBlog} />
            <span>{blogLikes}</span>
          </div>
          <div className="blog-comments-icon">
            <FaRegComment />
            <span>{blogComments}</span>
          </div>
        </div>
        <div className="blog-actions-2">
          <CiBookmarkPlus />
          <CiShare1 />
        </div>
      </div>
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: blogContent }}
      ></div>
		<CommentSection blogId={blogId}/>
    </main>
  );
};

export default Blog;
