import React, { useState, useEffect, lazy, Suspense } from "react";
import Navbar from "./components/Navbar/navbar";
// import Footer from './components/Footer/footer'
import "./app.css";

import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Route,
} from "react-router-dom";
import Loader from "./components/Loader/Loader";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const colorThemeChanger = (colors) => {
  const root = document.documentElement;
  let i = 1;
  colors.forEach((color) => {
    root.style.setProperty(`--col-${i}`, color);
    i++;
  });
};

const Home = lazy(() => import("./components/Home/home"));
const SignUp = lazy(() => import("./components/SignUp/signup"));
const Login = lazy(() => import("./components/LogIn/login"));
const BlogPage = lazy(() => import("./components/BlogPage/blogpage"));
const Blog = lazy(() => import("./components/Blog/blog"));
const NotFoundPage = lazy(() => import("./components/404Page/404page"));
const ProfileView = lazy(() => import("./components/ProfileView/profileview"));
const BlogMaker = lazy(() => import("./components/BlogMaker/blogmaker"));
const BlogsBy = lazy(() => import("./components/BlogsBy/blogsby"));

const App = () => {
  // colorThemeChanger(["#606c38", "#283618", "#fefae0", "#dda15e", "#bc6c25"]);
  const Layout = () => {
    return (
      <>
        <Navbar />
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
          element: <BlogsBy />,
        },
      ],
    },
  ]);

  return (
    <>
      <Suspense fallback=<Loader />>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
};

export default App;
