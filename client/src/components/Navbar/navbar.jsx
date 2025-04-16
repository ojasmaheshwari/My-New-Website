import React, { useState, useContext } from "react";
import burger from "../../assets/svg/burger.svg";
import { Link } from "react-router-dom";
import ProfileButton from "../ProfileButton/profilebutton";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="flex flex-row justify-between items-center h-24 px-2">
        <span className="text-2xl font-extrabold">EPIC</span>
        <ul className="hidden md:flex md:flex-row items-center justify-center gap-8 h-full">
          <Link
            to="/"
            className="hover:underline transition-all duration-400 underline-offset-8 decoration-transparent hover:decoration-black"
          >
            <li>Home</li>
          </Link>
          <Link
            to="/create"
            className="hover:underline transition-all duration-400 underline-offset-8 decoration-transparent hover:decoration-black"
          >
            <li>Create</li>
          </Link>
          <Link
            to="/blogs"
            className="hover:underline transition-all duration-400 underline-offset-8 decoration-transparent hover:decoration-black"
          >
            <li>Blogs</li>
          </Link>
          <Link
            to="/signup"
            className="hover:underline transition-all duration-400 underline-offset-8 decoration-transparent hover:decoration-black"
          >
            <li>Sign-Up</li>
          </Link>
        </ul>
        <button
          id="hamburger-button"
          onClick={toggleMenu}
          className="w-8 h-8 flex items-center justify-center md:hidden lg:hidden"
        >
          <GiHamburgerMenu />
        </button>
        <div className="flex flex-row items-center justify-center">
          <input
            type="text"
            name="search"
            placeholder="Search"
            className="mx-3 border-solid border-b-2 border-t-0 border-l-0 border-r-0 outline-none hidden md:flex lg:flex h-10"
          />
          <ProfileButton className="rounded-[50%] text-black" />
        </div>
      </nav>
      <div
        className="menu primary flex flex-col justify-center items-center shadow-md p-2"
        style={{ display: isMenuOpen ? "flex" : "none" }}
      >
        <ul className="flex flex-col items-center justify-center gap-2">
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
        <div className="w-full flex justify-center items-center my-2">
          <input
            type="text"
            name="search"
            placeholder="Search"
            className="text-center border-2 border-b-black border-t-transparent border-l-transparent border-r-transparent"
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
