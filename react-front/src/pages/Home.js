import React, { useEffect, useState, useRef } from "react";
import Lottie from "lottie-react";
import ArrowAnimation from "../animation/arrowLoad.json";

const HomePage = () => {
  const roleList = [
    "FRONTEND",
    "BACKEND",
    "DEVOPS",
    "FULLSTACK",
    "LLM",
    "CHATBOT",
    "WEB",
    "PLUGIN",
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const lottieRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(false);
      setRoleIndex((roleIndex) => (roleIndex + 1) % roleList.length);
      setTimeout(() => {
        setAnimate(true);
      }, 100);
      if (lottieRef.current) {
        lottieRef.current.goToAndPlay(25, true);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [roleList.length]);

  return (
    <div className="text-white h-screen">
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-full h-60">
          <div className="font-bold text-7xl text-center ">
            HI, HERE IS XIAOHENG HU
          </div>
          <div className="flex items-center justify-center">
            <span>
              <Lottie
                className="w-20 h-20"
                animationData={ArrowAnimation}
                loop={true}
                lottieRef={lottieRef}
              />
            </span>
            <span
              className={`border-2 w-80 text-center border-white rounded-lg font-semibold text-5xl p-3 mr-3`}
            >
              <div
                className={`text-center ${animate ? "animate-bounceY" : ""}`}
              >
                {roleList[roleIndex]}
              </div>
            </span>
            <span className="font-bold text-7xl">DEVELOPER</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
