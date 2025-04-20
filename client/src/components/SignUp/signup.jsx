import React, { useState, useContext } from "react";
import googleIcon from "../../assets/images/google_logo.png";
import facebookIcon from "../../assets/images/facebook_logo.png";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import PopUp from "../PopUp/popup";
import { PopUpContext } from "../PopUp/popupcontext";
import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const SignUp = () => {
  const [popUpData, setPopUpData, popUpShown, setIsPopUpShown] =
    useContext(PopUpContext);

  const submitToAPI = async (formData) => {
    try {
      const response = await axios.post(`${SERVER_URL}/signup`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const message = response.data.message;
      setPopUpData({
        heading: "SUCCESS",
        description: message,
      });
      setIsPopUpShown(true);
    } catch (error) {
      const errorMessage =
        error.response.data.message || "Some error occured, please try again.";
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
      const email = DOMPurify.sanitize(document.querySelector("#email").value);

      const passwordElem = document.querySelector("#password");
      const password = DOMPurify.sanitize(passwordElem.value);
      const confirmPasswordElem = document.querySelector("#conf-password");
      const confirmPassword = DOMPurify.sanitize(confirmPasswordElem.value);

      if (password !== confirmPassword) {
        setPopUpData({
          heading: "ERROR",
          description: "Passwords do not match, please try again.",
        });
        setIsPopUpShown(true);
      } else {
        console.log("form filled correctly");
        const formData = {
          username: username,
          email: email,
          password: password,
        };
        submitToAPI(formData);
        passwordElem.value = "";
        confirmPasswordElem.value = "";
        document.querySelector("#email").value = "";
        document.querySelector("#username").value = "";
      }
    } else {
      e.target.reportValidity();
    }
  };

  return (
    <main className="signup-main flex items-center justify-center w-[90%] h-screen mx-auto">
      <PopUp />
      <div className="container w-fit h-fit flex flex-col justify-center items-center gap-2 -translate-y-[25%] p-12 shadow-md rounded-md">
        <div className="signup-header my-4">
          <h1 className="text-2xl">Sign Up</h1>
          <span>
            Already a member?{" "}
            <Link to="/login" className="hover:underline">
              Log in
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
            type="email"
            name="email"
            id="email"
            placeholder="Email"
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
          <input
            type="password"
            name="conf-password"
            id="conf-password"
            placeholder="Confirm password"
            required
            className="border-1 border-t-transparent border-l-transparent border-r-transparent border-b-black outline-none"
          />
          <button
            type="submit"
            className="primary bg-white text-black px-4 py-2 my-4 border-2 border-black rounded-md hover:bg-black hover:text-white transition-all duration-400"
          >
            Sign Up
          </button>
        </form>
        <div className="other-signup-options my-2 flex flex-col gap-2">
          <span className="signup-separator">Or sign up with</span>
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

export default SignUp;
