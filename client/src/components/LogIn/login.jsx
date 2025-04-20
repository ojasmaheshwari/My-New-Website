import React, { useState, useContext } from "react";
import googleIcon from "../../assets/images/google_logo.png";
import facebookIcon from "../../assets/images/facebook_logo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";
import PopUp from "../PopUp/popup";
import { PopUpContext } from "../PopUp/popupcontext";
import { ProfileContext } from "../../services/ProfileContext";
import fetchProfile from "../../services/fetchprofile";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const Login = () => {
  const [popUpData, setPopUpData, isPopUpShown, setIsPopUpShown] =
    useContext(PopUpContext);
  const [profile, setProfile] = useContext(ProfileContext);

  const submitToAPI = async (formData) => {
    try {
      const response = await axios.post(`${SERVER_URL}/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      const message = response.data.message;

      setPopUpData({
        heading: "SUCCESS",
        description: message,
      });
      setIsPopUpShown(true);

      // Fetch profile and set it
      const fetchedProfile = await fetchProfile();
      console.log(fetchedProfile);
      if (fetchedProfile) {
        setProfile(fetchedProfile);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data.message || "Some error occured, please try again.";
      setPopUpData({
        heading: "ERROR",
        description: errorMessage,
      });
      setIsPopUpShown(true);
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      const username = DOMPurify.sanitize(
        document.querySelector("#username").value
      );
      const password = DOMPurify.sanitize(
        document.querySelector("#password").value
      );

      const formData = {
        username,
        password,
      };
      submitToAPI(formData);
      document.querySelector("#username").value = "";
      document.querySelector("#password").value = "";
    } else {
      e.target.reportValidity();
    }
  };

  return (
    <main className="signup-main flex items-center justify-center w-[90%] h-screen mx-auto">
      <PopUp />
      <div className="container w-fit h-fit flex flex-col justify-center items-center gap-2 -translate-y-[25%] p-12 shadow-md rounded-md">
        <div className="signup-header my-4">
          <h1 className="text-2xl">Log In</h1>
          <span>
            Not yet registered?{" "}
            <Link to="/signup" className="hover:underline">
              Sign Up
            </Link>
          </span>
        </div>
        <form
          method="post"
          action="signup"
          onSubmit={submitForm}
          className="flex justify-center items-center flex-col gap-2"
        >
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            required
            className="border-1 border-t-transparent border-l-transparent border-r-transparent border-b-black outline-none"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
            className="border-1 border-t-transparent border-l-transparent border-r-transparent border-b-black outline-none"
          />
          <button
            type="submit"
            className="primary primary bg-white text-black px-4 py-2 my-4 border-2 border-black rounded-md hover:bg-black hover:text-white transition-all duration-400"
          >
            Log In
          </button>
        </form>
        <div className="other-signup-options my-2 flex flex-col gap-2">
          <span className="signup-separator">Or continue with</span>
          <div className="logos flex items-center justify-center gap-4">
            <a href="#">
              <img src={facebookIcon} className="w-8 h-8" />
            </a>
            <a href="#">
              <img src={googleIcon} className="w-8 h-8" />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
