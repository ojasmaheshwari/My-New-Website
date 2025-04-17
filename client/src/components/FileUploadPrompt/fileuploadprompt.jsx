import React, { useContext, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { PopUpContext } from "../PopUp/popupcontext";
import { ProfileContext } from "../../services/ProfileContext";
import DOMPurify from "dompurify";
import axios from "axios";
import { FaUpload } from "react-icons/fa";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const FileUploadPrompt = ({
  isPromptOpen,
  setIsPromptOpen,
  setRequestedProfile,
}) => {
  const [file, setFile] = useState(null);
  const [popUpData, setPopUpData, popUpShown, setIsPopUpShown] =
    useContext(PopUpContext);
  const [profile, setProfile] = useContext(ProfileContext);

  const togglePrompt = () => setIsPromptOpen(!isPromptOpen);
  const changeFile = (e) => {
    const chosenFile = e.target.files[0];
    setFile(chosenFile);
  };
  const uploadImage = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        `${SERVER_URL}/updatepfpthroughupload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log("File uploaded successfully", response.data.file);
      const filename = response.data.file;
      const profilePicUrl = filename;
      setRequestedProfile({
        ...profile,
        profilePicUrl,
      });
      setProfile({
        ...profile,
        profilePicUrl,
      });
      setIsPromptOpen(false);
    } catch (error) {
      console.log(error.response?.data);
      setPopUpData({
        heading: "ERROR",
        description:
          error.response?.data?.message ||
          "Error occured while uploading your image, please verify that the image format is .png, .jpg, .jpeg or .gif and it is under 2 MB",
      });
      setIsPopUpShown(true);
    }
  };

  const updateThroughLink = async () => {
    const url = prompt("Enter the address to the image");
    const safeUrl = DOMPurify.sanitize(url);
    if (!url || !safeUrl) {
      setPopUpData({
        heading: "ERROR",
        description: "Please enter a valid url",
      });
      setIsPopUpShown(true);
      return;
    }

    const response = await axios.put(
      `${SERVER_URL}/updateprofile`,
      {
        username: profile?.username,
        profilePicUrl: safeUrl,
      },
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      console.log("Profile updated successfully", response.data);
      console.log(profile);
      setRequestedProfile({
        ...profile,
        profilePicUrl: safeUrl,
      });
      setProfile({
        ...profile,
        profilePicUrl: safeUrl,
      });
    } else {
      setPopUpData({
        heading: "ERROR",
        description: response.data?.message,
      });
      setIsPopUpShown(true);
    }
  };

  if (!isPromptOpen) {
    return null;
  }

  return (
    <div className="overlay-full w-full h-screen absolute z-1000 flex items-center justify-center backdrop-blur-sm left-0 top-0">
      <div className="fileuploadprompt-main shadow-md bg-white flex flex-col justify-center p-4 min-w-64 gap-4">
        <div className="popup-tab w-full flex items-center justify-end px-2">
          <RxCross2 className="popup-cross-icon" onClick={togglePrompt} />
        </div>
        <div className="fileuploadprompt-top">
          <form onSubmit={uploadImage} className="flex flex-col gap-2">
            <label
              htmlFor="fileuploadprompt-upload"
              className="fileuploadprompt-label flex p-2 bg-green-500 rounded-md w-fit text-white gap-2 items-center"
            >
              Upload
              <FaUpload />
            </label>
            <span className="fileuploadprompt-filename">
              File selected: {file?.name ? file.name : "none"}
            </span>
            <input
              id="fileuploadprompt-upload"
              type="file"
              onChange={changeFile}
              className="block hidden"
            />
            <button
              type="submit"
              className="fileuploadprompt-submit w-fit block border-1 border-black py-1 px-2 rounded-md cursor-pointer"
              disabled={file ? false : true}
            >
              Submit
            </button>
          </form>
        </div>
        <span className="fileuploadprompt-or-sep">OR</span>
        <div className="fileuploadprompt-bottom">
          <button
            onClick={updateThroughLink}
            className="border-1 border-black py-1 px-2 rounded-md cursor-pointer"
          >
            Use from link
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUploadPrompt;
