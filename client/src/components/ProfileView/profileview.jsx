import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ProfileContext } from "../../services/ProfileContext";
import { HiOutlinePencilAlt } from "react-icons/hi";
import "./profileview.css";
import PopUp from "../PopUp/popup";
import { PopUpContext } from "../PopUp/popupcontext";
import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const ProfileView = () => {
  const params = useParams();
  const [profile, setProfile] = useContext(ProfileContext);
	const [requestedProfile, setRequestedProfile] = useState({});
	const [popUpData, setPopUpData, isPopUpShown, setIsPopUpShown] = useContext(PopUpContext);

  const isProfileEditable = () => params.username === profile?.username;

	const fetchRequestedProfile = async() => {
		const requiredUsername = params.username;
		if (!requiredUsername) {
			setPopUpData({
				heading: "ERROR",
				description: "Username searched for is invalid or is empty",
			});
			setIsPopUpShown(true);

			useNavigate('/');
			return;
		}
		try {
		const response = await axios.get(`${SERVER_URL}/profile/${requiredUsername}`);
		console.log(response.data);
		setRequestedProfile(response.data.profile);
		}
		catch(error) {
			setPopUpData({
				heading: "ERROR",
				description: error.response?.data?.message,
			})
		}

	};

	useEffect(() => {
		fetchRequestedProfile();
	}, []);

  return (
    <div className="profileview-main">
		<PopUp />
      <div className="profileview-left">
        <img
          src={requestedProfile?.profilePicUrl}
          alt="profile pic"
          className="profileview-profilepic"
        />
        <div className="profileview-left-bottom">
          <span>@{requestedProfile?.username}</span>
        </div>
      </div>
      <div className="profileview-right">
        <div className="profileview-right-up">
          <div className="profileview-user-heading">
            <span>Some description about the user</span>
            <HiOutlinePencilAlt
              style={{
								marginLeft: ".5rem",
                display: isProfileEditable() ? "inline-block" : "none",
              }}
            />
          </div>

          <div className="profileview-user-about">
            <span>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure,
              quas placeat explicabo cupiditate sapiente quibusdam nam dolor
              magnam itaque mollitia, praesentium soluta, deserunt maiores
              inventore molestias sint suscipit dicta neque!
            </span>
            <HiOutlinePencilAlt
              style={{
								marginLeft: ".5rem",
                display: isProfileEditable() ? "inline-block" : "none",
              }}
            />
          </div>
        </div>
        <div className="profileview-right-bottom">
          <button className="profileview-follow-btn">Follow</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
