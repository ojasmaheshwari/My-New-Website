import React, { useState, useContext } from "react";
import "./profilebutton.css";
import { ProfileContext } from "../../services/ProfileContext";
import axios from "axios";
import PopUp from "../PopUp/popup";
import { PopUpContext } from "../PopUp/popupcontext";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const ProfileButton = () => {
  const [popUpData, setPopUpData, isPopUpShown, setIsPopUpShown] = useContext(PopUpContext);
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
    <div className="profile-container">
      <PopUp />
      <div className="profile-btn" onClick={toggleDropdown}>
        <img
          src={profile?.profilePicUrl}
          alt="profile"
          style={{
            border: isDropdownShown
              ? "2px solid var(--col-bg)"
              : "2px solid transparent",
          }}
        />
      </div>
      <div
        className="profile-dropdown"
        style={{
          display: isDropdownShown ? "flex" : "none",
        }}
      >
        <ul>
          <a href="#" onClick={toggleDropdown}>
            <li className="profile-username">
              {profile?.username ? `@${profile?.username}` : "login"}
            </li>
          </a>
          <a href="#" onClick={toggleDropdown}>
            <li>Another action</li>
          </a>
          <a href="#" onClick={toggleDropdown}>
            <li className="profile-logout" onClick={logout}>
              Log out
            </li>
          </a>
        </ul>
      </div>
    </div>
  );
};

export default ProfileButton;
