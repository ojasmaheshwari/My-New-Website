import React, { useState, useContext } from "react";
import "./profilebutton.css";
import { ProfileContext } from "../../services/ProfileContext";

const ProfileButton = () => {
  const [isDropdownShown, setIsDropdownShown] = useState(false);
	const [profile, setProfile]= useContext(ProfileContext);

  const toggleDropdown = () => setIsDropdownShown(!isDropdownShown);

  return (
    <div className="profile-container">
      <div className="profile-btn" onClick={toggleDropdown}>
        <img
          src="https://images.sftcdn.net/images/t_app-cover-l,f_auto/p/e76d4296-43f3-493b-9d50-f8e5c142d06c/2117667014/boys-profile-picture-screenshot.png"
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
            <li>{profile?.username || "Login"}</li>
          </a>
          <a href="#" onClick={toggleDropdown}>
            <li>Another action</li>
          </a>
          <a href="#" onClick={toggleDropdown}>
            <li>Log out</li>
          </a>
        </ul>
      </div>
    </div>
  );
};

export default ProfileButton;
