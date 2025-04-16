import React, { useEffect, useState } from "react";
import Card from "../Card/card";
import { Link } from "react-router-dom";

const Home = () => {
  const langsList = ["Rust", "OpenGL", "Cyber Security"];
  const [currentLangIdx, setCurrentLangIdx] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentLangIdx((prevIdx) =>
        prevIdx < langsList.length - 1 ? prevIdx + 1 : 0
      );
    }, 3000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <main className="flex flex-col items-center h-screen px-2">
        <h1 className="text-3xl mt-12 text-center">
          Hi! My Name is{" "}
          <span className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent text-nowrap">
            Ojas Maheshwari
          </span>
        </h1>

        <h2 className="text-md text-left mt-4">
          I am a <span className="font-bold">C++</span> developer
          <p className="text-left w-full">
            I am also interested in{" "}
            <span className="relative mx-1 text-left min-w-[100px]">
              {langsList.map((lang, idx) => (
                <span
                  key={idx}
                  className={`${
                    idx === currentLangIdx ? "opacity-100" : "opacity-0"
                  } absolute transition-all duration-400 font-bold min-w-[150px]`}
                >
                  {lang}
                </span>
              ))}
            </span>
          </p>
          <p className="text-center">
            I also like making things from scratch btw :)
          </p>
        </h2>

        <h2 className="mt-12 text-center">
          This is my blog website where people can write blogs about
          programming, technologies etc.
        </h2>

        <Link
          to={"/blogs"}
          className="mt-6 border-solid border-black border-2 rounded-md p-2 hover:bg-black hover:text-white transition-all duration-500 hover:scale-120"
        >
          See Blogs
        </Link>
      </main>
    </>
  );
};

export default Home;
