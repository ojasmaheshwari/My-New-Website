import React, { useContext, useRef, useState } from "react";
import { marked } from "marked";
import { PopUpContext } from "../PopUp/popupcontext";
import { ProfileContext } from "../../services/ProfileContext";
import axios from "axios";
import "./blogmaker.css";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const BlogMaker = () => {
  const [blogMarkdownContent, setBlogMarkdownContent] = useState("");
  const inputPane = useRef();
  const outputPane = useRef();
  const [popUpData, setPopUpData, popUpShown, setIsPopUpShown] =
    useContext(PopUpContext);
	const [profile, setProfile] = useContext(ProfileContext);

	if (!profile) {
		return (
			<h1>You must be signed-in to create and publish blogs</h1>
		)
	}

  const updateOutput = () => {
    outputPane.current.innerHTML = marked.parse(blogMarkdownContent);
  };

  const updateMarkdownContent = () => {
    setBlogMarkdownContent(inputPane.current.value);
    updateOutput();
  };

  const submitBlog = async (e) => {
    e.preventDefault();
    const blogHeadingElem = document.getElementById("blogmaker-blog-heading");
    const blogHeading = blogHeadingElem.value;
    const blogDescriptionElem = document.getElementById(
      "blogmaker-blog-description",
    );
    const blogDescription = blogDescriptionElem.value;
		const blogThumbnail = document.getElementById("blogmaker-blog-thumbnail").value;

    try {
      const response = await axios
        .post(
          `${SERVER_URL}/uploadblog`,
          {
            heading: blogHeading,
            description: blogDescription,
            blogMarkdownContent,
						blogThumbnail
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
              "Some error occured while trying to post your blog, please try again later or contact @ojas",
          });
          setIsPopUpShown(true);
        });

			setPopUpData({
				heading: "SUCCESS",
				description: response.data?.message || "Your blog has been posted!"
			});
			setIsPopUpShown(true);
			inputPane.current.value = "";


    } catch (error) {
      setPopUpData({
        heading: "ERROR",
        description:
          error.response?.data?.message ||
          "Some error occured while trying to post your blog, please try again later or contact @ojas",
      });
      setIsPopUpShown(true);
    }
  };

  return (
    <div className="blogmaker-main">
      <div className="blogmaker-editor-wrapper">
        <div className="blogmaker-left">
          <textarea
            name="blogmaker-markdown-input"
            id="blogmaker-markdown-input"
            onKeyUp={() => {
              setTimeout(updateMarkdownContent, 0);
            }}
            ref={inputPane}
          ></textarea>
        </div>
        <div className="blogmaker-right" ref={outputPane}></div>
      </div>
      <div className="blogmaker-submit-form">
        <form className="blogmaker-form" onSubmit={submitBlog}>
          <label htmlFor="blogmaker-blog-heading">Blog Heading: </label>
          <input type="text" id="blogmaker-blog-heading" />
          <label htmlFor="blogmaker-blog-description">Blog description: </label>
          <input type="text" id="blogmaker-blog-description" />
					<label htmlFor="blogmaker-blog-thumbnail"> Blog Thumbnail: </label>
          <input type="text" id="blogmaker-blog-thumbnail" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default BlogMaker;
