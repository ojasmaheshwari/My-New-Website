import React, { useEffect, useState, useContext, useRef } from "react";
import { PopUpContext } from "../PopUp/popupcontext";
import { Link } from "react-router-dom";
import axios from "axios";
import { use } from "marked";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const Comment = (props) => {
  const commentData = props.commentData;
  return (
    <div className="comment flex flex-col border-1 border-t-transparent border-b-black border-r-transparent border-l-transparent py-2">
      <div className="comment-metadata flex gap-4 items-center my-1">
        <img
          src={commentData.profilePicUrl}
          alt="User profile pic"
          className="w-8 h-8 rounded-[50%]"
        />
        <Link
          to={`/profile/${commentData.username}`}
          className="hover:underline text-md"
        >
          {commentData.username}
        </Link>
        <span className="text-sm font-thin">{commentData.timePosted}</span>
      </div>
      <div className="comment-content">
        {commentData.content || "Some error occured while loading this comment"}
      </div>
    </div>
  );
};

const CommentSection = (props) => {
  const blogId = props.blogId;
  const [comments, setComments] = useState([]);
  const [popUpData, setPopUpData, isPopUpShown, setIsPopUpShown] =
    useContext(PopUpContext);
  const commentInput = useRef();
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios
          .get(`${SERVER_URL}/getcomments/${blogId}`)
          .catch((error) => {
            if (error.response.statusCode === 404) {
              return;
            }
            setPopUpData({
              heading: "ERROR",
              description:
                error?.response?.data?.message ||
                "Something went wrong while trying to fetch comments for this blog, please contact @ojas or try again later",
            });
            setIsPopUpShown(true);
          });
        setComments(response.data);
      } catch (error) {
        setPopUpData({
          heading: "ERROR",
          description:
            "Some error occured while trying to fetch comments, please contact @ojas or try again later",
        });
        setIsPopUpShown(true);
        console.log(error);
      }
    };

    fetchComments();
  }, []);

  const postComment = async (e) => {
    e.preventDefault();
    try {
      const content = commentInput.current.value;
      const response = await axios
        .post(
          `${SERVER_URL}/postcomment`,
          {
            commentData: {
              blogId,
              content,
            },
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
              "Some error occured, please try again later or contact @ojas",
          });
          setIsPopUpShown(true);
        });
      if (response.status === 200) {
        setPopUpData({
          heading: "SUCCESS",
          description: "Your comment was posted successfully",
        });
        setIsPopUpShown(true);
        commentInput.current.value = "";
      }
    } catch (error) {
      setPopUpData({
        heading: "ERROR",
        description:
          "Something went wrong while posting your comment, please contact @ojas or try again later",
      });
      setIsPopUpShown(true);
      console.log(error);
    }
  };

  if (!blogId) {
    return null;
  }
  return (
    <div className="commentsection my-8">
      <h1 className="text-2xl">Comments</h1>
      <form className="commentsection-write mb-4" onSubmit={postComment}>
        <textarea
          id="commentsection-comment-input"
          placeholder="Share your thoughts"
          ref={commentInput}
          className="w-full h-18 border-1 border-black rounded-sm my-1 p-2"
        />
        <button
          type="submit"
          className="bg-white text-black border-1 hover:bg-black hover:text-white py-2 px-4 rounded-md transition-all duration-400"
        >
          Submit
        </button>
      </form>
      <div className="comments-wrapper flex flex-col justify-center gap-4">
        {comments.map((comment, index) => (
          <Comment commentData={comment} key={index} />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
