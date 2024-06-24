import React, { useState } from 'react'
import './profilebutton.css'

const ProfileButton = ({ username }) => {
    const [isDropdownShown, setIsDropdownShown] = useState(false);

    const toggleDropdown = () => setIsDropdownShown(!isDropdownShown);

    return (
        <div className='profile-container'>
            <div className='profile-btn' onClick={toggleDropdown}>
                <img src="https://images.sftcdn.net/images/t_app-cover-l,f_auto/p/e76d4296-43f3-493b-9d50-f8e5c142d06c/2117667014/boys-profile-picture-screenshot.png" alt="profile"
                    style={{
                        border: isDropdownShown ? "2px solid var(--col-bg)" : "2px solid transparent",
                    }}
                />
            </div>
            <div className='profile-dropdown'
                style={{
                    display: isDropdownShown ? "flex" : "none",
                }}
            >
                <ul>
                    <a href="#" onClick={toggleDropdown}>
                        <li>
                            {username}
                        </li>
                    </a>
                    <a href="#" onClick={toggleDropdown}>
                        <li>
                            Another action
                        </li>
                    </a>
                    <a href="#" onClick={toggleDropdown}>
                        <li>
                            Log out
                        </li>
                    </a>
                </ul>
            </div>
        </div>
    )
}

export default ProfileButton