import React, { useState, useContext } from 'react'
import './navbar.css'
import burger from '../../assets/svg/burger.svg'
import { Link } from 'react-router-dom'
import ProfileButton from '../ProfileButton/profilebutton'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <nav className='primary'>
                <span id='navLogo'>
                    EPIC
                </span>
                <ul>
                    <Link to="/" className="active">
                        <li>Home</li>
                    </Link>
                    <Link to="/create">
                        <li>Create</li>
                    </Link>
                    <Link to="/blogs">
                        <li>Blogs</li>
                    </Link>
                    <Link to="/signup">
                        <li>Sign-Up</li>
                    </Link>
                </ul>
                <div className='nav-right'>
                    <input type="text" name="search" placeholder="Search" />
                    <ProfileButton className="navbar-profile-elem"/>
                </div>
                <button id="hamburger-button" onClick={toggleMenu}>
                    <img src={burger} />
                </button>
            </nav>
            <div className="menu primary" style={{ display: isMenuOpen ? "flex" : "none" }}>
                <ul>
                    <Link to="/" onClick={toggleMenu}>
                        <li>Home</li>
                    </Link>
                    <Link to="/create" onClick={toggleMenu}>
                        <li>Create</li>
                    </Link>
                    <Link to="/blogs" onClick={toggleMenu}>
                        <li>Blogs</li>
                    </Link>
                    <Link to="/signup" onClick={toggleMenu}>
                        <li>Sign-Up</li>
                    </Link>
                </ul>
                <input type="text" name="search" placeholder="Search" />
            </div >
        </>

    )
}

export default Navbar
