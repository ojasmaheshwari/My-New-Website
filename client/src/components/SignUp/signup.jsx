import React, { useState, useContext } from "react";
import "./signup.css";
import googleIcon from "../../assets/images/google_logo.png";
import facebookIcon from "../../assets/images/facebook_logo.png";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import PopUp from "../PopUp/popup";
import { PopUpContext } from "../PopUp/popupcontext";
import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const SignUp = () => {
  const [popUpData, setPopUpData, popUpShown, setIsPopUpShown] = useContext(PopUpContext);

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
			})
			setIsPopUpShown(true);
    } catch (error) {
      const errorMessage =
        error.response.data.message || "Some error occured, please try again.";
			setPopUpData({
				heading: "ERROR",
				description: errorMessage,
			})
			setIsPopUpShown(true);
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      const username = DOMPurify.sanitize(
        document.querySelector("#username").value,
      );
      const email = DOMPurify.sanitize(document.querySelector("#email").value);

      const passwordElem = document.querySelector("#password");
      const password = DOMPurify.sanitize(passwordElem.value);
      const confirmPasswordElem = document.querySelector("#conf-password");
      const confirmPassword = DOMPurify.sanitize(confirmPasswordElem.value);

      if (password !== confirmPassword) {
				setPopUpData({
					heading: "ERROR",
					description: "Passwords do not match, please try again."
				})
				setIsPopUpShown(true);
      } else {
        console.log("form filled correctly");
        const formData = {
          username: username,
          email: email,
          password: password,
        };
        submitToAPI(formData);
      }
    } else {
      e.target.reportValidity();
    }
  };

  return (
    <main className="signup-main">
      <PopUp />
      <div className="container">
        <div className="signup-header">
          <h1>Sign Up</h1>
          <span>
            Already a member? <Link to="/login">Log in</Link>
          </span>
        </div>
        <form method="post" action="signup" onSubmit={submitForm}>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            required
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
          />
          <input
            type="password"
            name="conf-password"
            id="conf-password"
            placeholder="Confirm password"
            required
          />
          <button type="submit" className="primary">
            Sign Up
          </button>
        </form>
        <div className="other-signup-options">
          <span className="signup-separator">Or sign up with</span>
          <div className="logos">
            <a href="#">
              <img src={facebookIcon} />
            </a>
            <a href="#">
              <img src={googleIcon} />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
