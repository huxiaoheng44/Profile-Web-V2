import React, { useEffect, useState } from "react";
import LightUp from "../components/LightUp";
import Lottie from "lottie-react";
import Hobby from "../components/Hobby";

const AboutMePage = () => {
  const [isLighted, setIsLighted] = useState(false);

  const handleLightUp = () => {
    setIsLighted(true);
  };

  return (
    <div className="text-white">
      <div
        className="absolute left-0 top-20 w-full z-30"
        style={{ height: "calc(100vh - 5rem)" }}
      >
        <LightUp />
        {/* <div className="lighted-bg-floor w-full h-32">floor</div> */}
      </div>

      <div className="lighted-bg section h-screen flex justify-center items-center bg-black relative">
        {/* mask layer */}
        <div
          className="lighted-cover absolute inset-0 bg-black opacity-80 z-10 "
          style={{ height: "200vh" }}
        ></div>

        <div className="flex justify-center items-center">
          <img
            src={`${process.env.PUBLIC_URL}/resources/images/avatar.jpg`}
            alt="Profile"
            className="lighted w-96 h-96 rounded-full object-cover "
          />
        </div>

        <div className="text-white lighted p-10 mx-20 rounded-xl text-left px-10 w-96 h-96 flex flex-col justify-center">
          <p className="lighted-tag py-2 text-4xl font-bold rounded-full flex justify-center mb-10">
            Xiaoheng Hu
          </p>
          <div className="flex flex-wrap mt-4">
            <span className="bg-gray-900 lighted-tag text-white py-1 px-3 rounded-full mr-2 mb-2">
              #Web Development
            </span>

            <span className="bg-gray-900 lighted-tag text-white py-1 px-3 rounded-full mr-2 mb-2">
              #DevOps
            </span>
            <span className="bg-gray-900 lighted-tag text-white py-1 px-3 rounded-full mr-2 mb-2">
              #LLM
            </span>
            <span className="bg-gray-900 lighted-tag text-white py-1 px-3 rounded-full mr-2 mb-2">
              #JavaScript
            </span>
            <span className="bg-gray-900 lighted-tag text-white py-1 px-3 rounded-full mr-2 mb-2">
              #React
            </span>
            <span className="bg-gray-900 lighted-tag text-white py-1 px-3 rounded-full mr-2 mb-2">
              #Node.js
            </span>
            <span className="bg-gray-900 lighted-tag text-white py-1 px-3 rounded-full mr-2 mb-2">
              #CI/CD
            </span>
            <span className="bg-gray-900 lighted-tag text-white py-1 px-3 rounded-full mr-2 mb-2">
              #Docker
            </span>
            <span className="bg-gray-900 lighted-tag text-white py-1 px-3 rounded-full mr-2 mb-2">
              #Kubernetes
            </span>
            {/* Add more tags as needed */}
          </div>
        </div>
      </div>

      <div className="lighted-bg2 section h-screen flex flex-col justify-center items-center bg-black z-30">
        <h2 className="text-2xl font-semibold">Some content after</h2>
        <Hobby />
      </div>
    </div>
  );
};

export default AboutMePage;
