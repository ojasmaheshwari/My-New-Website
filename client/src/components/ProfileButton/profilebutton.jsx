import React, { useState, useContext } from "react";
import { ProfileContext } from "../../services/ProfileContext";
import axios from "axios";
import PopUp from "../PopUp/popup";
import { PopUpContext } from "../PopUp/popupcontext";
import { Link } from "react-router-dom";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const ProfileButton = () => {
  const [popUpData, setPopUpData, isPopUpShown, setIsPopUpShown] =
    useContext(PopUpContext);
  const [isDropdownShown, setIsDropdownShown] = useState(false);
  const [profile, setProfile] = useContext(ProfileContext);

  const logout = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/logout`, {
        withCredentials: true,
      });

      const message = response.data.message;
      console.log(response.data);
      setPopUpData({
        heading: "SUCCESS",
        description: message,
      });
      setIsPopUpShown(true);

      // setProfile to {}
      setProfile({});
    } catch (error) {
      const errorMessage = error.response.data.message;
      setPopUpData({
        heading: "ERROR",
        description: errorMessage,
      });
      setIsPopUpShown(true);
      console.log(error);
    }
  };

  const toggleDropdown = () => setIsDropdownShown(!isDropdownShown);

  return (
    <div className="profile-container mx-2 relative">
      <PopUp />
      <div className="profile-btn">
        {profile?.username ? (
          <img
            src={profile?.profilePicUrl}
            alt="profile"
            style={{
              border: isDropdownShown
                ? "2px solid var(--col-bg)"
                : "2px solid transparent",
            }}
            onClick={toggleDropdown}
            className="w-12 h-12 rounded-[50%]"
          />
        ) : (
          <Link
            className="profile-login-btn text-black py-2 px-4 border-2 border-black rounded-md hover:text-white hover:bg-black transition-all duration-400"
            to="/login"
          >
            Log In
          </Link>
        )}
      </div>
      <div
        className="profile-dropdown bg-white z-100"
        style={{
          display: isDropdownShown ? "flex" : "none",
        }}
      >
        <ul className="absolute rounded-md right-2 shadow-md min-w-24 min-h-32 flex flex-col items-center justify-evenly bg-white">
          <Link
            to={`/profile/${profile?.username}`}
            onClick={toggleDropdown}
            className="w-full h-full hover:bg-gray-200 p-2 transition-all duration-200"
          >
            <li className="profile-username">
              {profile?.username ? `@${profile?.username}` : "login"}
            </li>
          </Link>
          <Link
            to={`/blogsby/${profile?.username}`}
            onClick={toggleDropdown}
            className="w-full h-full hover:bg-gray-200 p-2 transition-all duration-200"
          >
            <li>Your blogs</li>
          </Link>
          <Link
            to="/"
            onClick={toggleDropdown}
            className="w-full h-full hover:bg-gray-200 p-2 transition-all duration-200"
          >
            <li className="profile-logout" onClick={logout}>
              Log out
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default ProfileButton;
