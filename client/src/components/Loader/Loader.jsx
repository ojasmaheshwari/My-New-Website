import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-full absolute left-0 top-0 flex items-center justify-center">
      <img
        className="w-18 h-18"
        src="https://cdnl.iconscout.com/lottie/premium/thumb/loader-5478808-4574104.gif"
        alt="Loading"
      />
    </div>
  );
};

export default Loader;
