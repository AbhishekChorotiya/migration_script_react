import React from "react";

const LoadingView = () => {
  return (
    <div className="w-full h-full flex mb-10 justify-center items-center">
      <div className="h-16 flex relative rounded-full overflow-hidden items-center justify-center w-16 bg-gray-300">
        <div className="absolute h-28 w-7 bg-blue-600 animate-spin"></div>
        <div className="h-12 absolute w-12 rounded-full bg-white"></div>
      </div>
    </div>
  );
};

export default LoadingView;
