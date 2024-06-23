import React, { useState } from 'react'
import googleIcon from '../../assets/images/google_logo.png'
import facebookIcon from '../../assets/images/facebook_logo.png'
import { Link } from 'react-router-dom'
import axios from 'axios'
import DOMPurify from 'dompurify'
import PopUp from '../PopUp/popup'

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const Login = () => {
    const [isPopUpShown, setIsPopUpShown] = useState(false);
    const [popUpHeading, setPopUpHeading] = useState("Hey there");
    const [popUpDescription, setPopUpDescription] = useState("Some error occured, please try again.");

    const submitToAPI = async (formData) => {
        try {
            const response = await axios.post(`${SERVER_URL}/login`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            setPopUpHeading("SUCCESS");
            setPopUpDescription(response.data.message);
            setIsPopUpShown(true);

        } catch (error) {
            const errorMessage = error.response.data.message || "Some error occured, please try again.";
            setPopUpHeading("OOPS!");
            setPopUpDescription(errorMessage);
            setIsPopUpShown(true);
        }
    }

    const submitForm = (e) => {
        e.preventDefault();
        if (e.target.checkValidity()) {
            const username = DOMPurify.sanitize(document.querySelector('#username').value);
            const password = DOMPurify.sanitize(document.querySelector('#password').value);

            const formData = {
                username,
                password,
            }
            submitToAPI(formData);
        }
        else {
            e.target.reportValidity();
        }
    }

    return (
        <main className='signup-main'>
            <PopUp
                heading={popUpHeading}
                description={popUpDescription}
                show={isPopUpShown}
                onClose={
                    () => { setIsPopUpShown(false) }
                }
            />
            <div className="container">
                <div className="signup-header">
                    <h1>Log In</h1>
                    <span>
                        Not yet registered? <Link to="/signup">Sign Up</Link>
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
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        required
                    />
                    <button type="submit" className='primary'>Log In</button>
                </form>
                <div className="other-signup-options">
                    <span className="signup-separator">Or continue with</span>
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
    )
}

export default Login 