import React, { useContext, useRef, useState } from "react";
import { marked } from "marked";
import { PopUpContext } from "../PopUp/popupcontext";
import { ProfileContext } from "../../services/ProfileContext";
import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const BlogMaker = () => {
  const [blogMarkdownContent, setBlogMarkdownContent] = useState("");
  const inputPane = useRef();
  const outputPane = useRef();
  const [popUpData, setPopUpData, popUpShown, setIsPopUpShown] =
    useContext(PopUpContext);
  const [profile, setProfile] = useContext(ProfileContext);

  if (!profile) {
    return <h1>You must be signed-in to create and publish blogs</h1>;
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
      "blogmaker-blog-description"
    );
    const blogDescription = blogDescriptionElem.value;
    const blogThumbnail = document.getElementById(
      "blogmaker-blog-thumbnail"
    ).value;

    try {
      const response = await axios
        .post(
          `${SERVER_URL}/uploadblog`,
          {
            heading: blogHeading,
            description: blogDescription,
            blogMarkdownContent,
            blogThumbnail,
          },
          {
            withCredentials: true,
          }
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
        description: response.data?.message || "Your blog has been posted!",
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
    <div className="blogmaker-main w-[90%] mx-auto flex flex-col gap-8">
      <div className="blogmaker-editor-wrapper flex flex-col md:flex-row lg:flex-row w-full h-128 gap-2">
        <div className="blogmaker-left w-full md:w-[50%] lg:w-[50%] h-full">
          <h1 className="text-2xl mb-2">Enter markdown here</h1>
          <textarea
            name="blogmaker-markdown-input"
            id="blogmaker-markdown-input"
            onKeyUp={() => {
              setTimeout(updateMarkdownContent, 0);
            }}
            ref={inputPane}
            className="w-full h-[90%] border-1 p-2 rounded-sm"
          ></textarea>
        </div>
        <div className="w-[50%] h-full w-full md:w-[50%] lg:w-[50%]">
          <h1 className="text-2xl mb-2">Output Pane</h1>
          <div
            className="blogmaker-right w-full h-[90%] border-1 rounded-sm p-2"
            ref={outputPane}
          ></div>
        </div>
      </div>
      <div className="blogmaker-submit-form flex flex-col">
        <form
          className="blogmaker-form w-full h-full flex flex-col gap-2"
          onSubmit={submitBlog}
        >
          <label htmlFor="blogmaker-blog-heading">Blog Heading: </label>
          <input
            type="text"
            id="blogmaker-blog-heading"
            className="border-1 w-full rounded-sm p-2 ml-1"
          />
          <label htmlFor="blogmaker-blog-description">Blog description: </label>
          <input
            type="text"
            id="blogmaker-blog-description"
            className="border-1 w-full rounded-sm p-2 ml-1"
          />
          <label htmlFor="blogmaker-blog-thumbnail"> Blog Thumbnail: </label>
          <input
            type="text"
            id="blogmaker-blog-thumbnail"
            className="border-1 w-full rounded-sm p-2 ml-1"
          />
          <button
            type="submit"
            className="bg-white text-black p-2 border-1 rounded-md w-fit mx-auto my-2 hover:bg-black hover:text-white transition-all duration-400"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogMaker;
