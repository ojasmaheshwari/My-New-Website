import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ProfileContext } from "../../services/ProfileContext";
import { HiOutlinePencilAlt } from "react-icons/hi";
import PopUp from "../PopUp/popup";
import { PopUpContext } from "../PopUp/popupcontext";
import DOMPurify from "dompurify";
import FileUploadPrompt from "../FileUploadPrompt/fileuploadprompt";
import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const ProfileView = () => {
  const params = useParams();
  const [profile, setProfile] = useContext(ProfileContext);
  const [requestedProfile, setRequestedProfile] = useState({});
  const [popUpData, setPopUpData, isPopUpShown, setIsPopUpShown] =
    useContext(PopUpContext);
  const navigate = useNavigate();
  const [isPromptOpen, setIsPromptOpen] = useState(false);

  const isProfileEditable = () => params.username === profile?.username;

  const fetchRequestedProfile = async () => {
    const requiredUsername = params.username;
    if (!requiredUsername) {
      setPopUpData({
        heading: "ERROR",
        description: "Username searched for is invalid or is empty",
      });
      setIsPopUpShown(true);

      navigate("/");
      return;
    }
    try {
      const response = await axios.get(
        `${SERVER_URL}/profile/${requiredUsername}`
      );
      console.log(response.data);
      setRequestedProfile(response.data.profile);
    } catch (error) {
      setPopUpData({
        heading: "ERROR",
        description: error.response?.data?.message,
      });
      setIsPopUpShown(true);
      navigate("/");
    }
  };

  const editUsername = () => {
    const usernameElem = document.getElementById("profileview-username");
    const submitElem = document.querySelector(".profileview-submit-btn");
    submitElem.style.display = "block";
    usernameElem.contentEditable = true;
    usernameElem.focus();
  };

  const editAbout = () => {
    const aboutElem = document.getElementById("profileview-about");
    const submitElem = document.querySelector(".profileview-submit-btn");
    submitElem.style.display = "block";
    aboutElem.contentEditable = true;
    aboutElem.focus();
  };

  const changeProfilePic = async () => {
    setIsPromptOpen(true);
  };

  const submit = async (e) => {
    const submitElem = e.target;
    const usernameElem = document.getElementById("profileview-username");
    const aboutElem = document.getElementById("profileview-about");
    const newFullname = usernameElem.innerText;
    const newAbout = aboutElem.innerText;
    usernameElem.contentEditable = false;
    aboutElem.contentEditable = false;
    submitElem.style.display = "none";
    // Send req to server

    const response = await axios.put(
      `${SERVER_URL}/updateprofile`,
      {
        username: profile?.username,
        fullName: newFullname,
        about: newAbout,
      },
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      console.log("Profile updated successfully", response.data);
    } else {
      setPopUpData({
        heading: "ERROR",
        description: response.data?.message,
      });
      setIsPopUpShown(true);
    }
  };

  useEffect(() => {
    fetchRequestedProfile();
  }, []);

  return (
    <div className="profileview-centralizer w-[90%] my-32 mx-auto flex flex-col justify-center items-center">
      <FileUploadPrompt
        isPromptOpen={isPromptOpen}
        setIsPromptOpen={setIsPromptOpen}
        setRequestedProfile={setRequestedProfile}
      />
      <div className="profileview-main flex flex-col shadow-md p-8">
        <PopUp />
        <div className="profileview-left flex flex-col items-center">
          <div
            className={`profileview-profilepic ${
              isProfileEditable() ? "imageEditable" : ""
            }`}
          >
            <img
              src={requestedProfile?.profilePicUrl}
              alt="profile pic"
              onClick={isProfileEditable() ? changeProfilePic : ""}
              className="w-24 h-24 rounded-[50%]"
            />
            {/* <div className="profileview-img-overlay">CHANGE</div> */}
          </div>
          <div className="profileview-left-bottom">
            <span>@{requestedProfile?.username}</span>
          </div>
        </div>
        <div className="profileview-right my-4">
          <div className="profileview-right-up">
            <div className="profileview-user-heading">
              <span id="profileview-username" spellCheck="false">
                {requestedProfile?.fullName}
              </span>
              <HiOutlinePencilAlt
                style={{
                  marginLeft: ".5rem",
                  display: isProfileEditable() ? "inline-block" : "none",
                }}
                onClick={editUsername}
              />
            </div>

            <div className="profileview-user-about">
              <span id="profileview-about" spellCheck="false">
                {requestedProfile?.about}
              </span>
              <HiOutlinePencilAlt
                style={{
                  marginLeft: ".5rem",
                  display: isProfileEditable() ? "inline-block" : "none",
                }}
                onClick={editAbout}
              />
            </div>
          </div>
          <div className="profileview-right-bottom my-4 flex gap-4 justify-center items-center">
            <button
              className={`profileview-follow-btn bg-white text-black border-1 border-black rounded-md p-2 hover:bg-black hover:text-white transition-all duration-400
              ${isProfileEditable() ? "hidden" : "flex"}`}
            >
              Follow
            </button>
            <button
              className={`profileview-submit-btn ${
                isProfileEditable() ? "flex" : "hidden"
              } bg-white text-black border-1 border-black rounded-md p-2 hover:bg-black hover:text-white transition-all duration-400"`}
              onClick={submit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
