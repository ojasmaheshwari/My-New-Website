import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-screen absolute left-0 top-0 flex items-center justify-center">
      <img
        className="w-18 h-18"
        src="https://media.tenor.com/Zls7JMTdaaQAAAAd/loading-loading-gif.gif"
        alt="Loading"
      />
    </div>
  );
};

export default Loader;
