import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/navbar";
import Home from "./components/Home/home";
import SignUp from "./components/SignUp/signup";
import Login from "./components/LogIn/login";
import NotFoundPage from "./components/404Page/404page";
// import Footer from './components/Footer/footer'
import BlogsCollection from "./components/BlogsCollection/blogscollection";
import Blog from "./components/Blog/blog";
import ProfileView from "./components/ProfileView/profileview";
import BlogMaker from "./components/BlogMaker/blogmaker";
import BlogPage from "./components/BlogPage/blogpage";
import "./app.css";

import {
	createBrowserRouter,
	RouterProvider,
	Outlet,
	Route,
} from "react-router-dom";
import BlogsBy from "./components/BlogsBy/blogsby";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const colorThemeChanger = (colors) => {
  const root = document.documentElement;
  let i = 1;
  colors.forEach((color) => {
    root.style.setProperty(`--col-${i}`, color);
    i++;
  });
};

const App = () => {
	// colorThemeChanger(["#606c38", "#283618", "#fefae0", "#dda15e", "#bc6c25"]);
	const Layout = () => {
		return (
			<>
			<Navbar/>
			<Outlet />
			{/* <Footer /> */}
			</>
		);
	};

	const router = createBrowserRouter([
		{
			element: <Layout />,
			children: [
				{
					path: "/",
					element: <Home />,
				},
				{
					path: "/signup",
					element: <SignUp />,
				},
				{
					path: "/login",
					element: <Login />,
				},
				{
					path: "/blogs",
					element: <BlogPage />,
				},
				{
					path: "/blogs/:blog",
					element: <Blog />,
				},
				{
					path: "*",
					element: <NotFoundPage />,
				},
				{
					path: "/profile/:username",
					element: <ProfileView />,
				},
				{
					path: "/create",
					element: <BlogMaker />,
				},
				{
					path: "/blogsby/:username",
					element: <BlogsBy />
				}
			],
		},
	]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
