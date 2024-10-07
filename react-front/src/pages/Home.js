import React, { useEffect, useState, useRef } from "react";
import Lottie from "lottie-react";
import ArrowAnimation from "../animation/arrowLoad.json";
import ArrowDown from "../animation/arrowDown.json";
import walkAnimation from "../animation/astronaut.json";
import { createAnimationFunction } from "../utils/animation";
import HomePageTitle from "../components/HomePageTitle";

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

  const [showBackToTop, setShowBackToTop] = useState(false);

  // Function to scroll back to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Show the back-to-top button when scrolled down a certain amount
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 2000) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const carouselContainer = document.getElementById("carousel-container");
    const carousel = document.querySelector(".carousel");
    const carouselItems = document.querySelectorAll(".carousel-item");
    const playground = document.querySelector(".animation-playground");

    const playgroundTop =
      playground.getBoundingClientRect().top + window.scrollY;
    const playgroundBottom =
      playground.getBoundingClientRect().bottom + window.scrollY;

    // 300 comes from the number of carousel items
    console.log("playgroundBottom", playgroundBottom);
    const scrollFunction = createAnimationFunction(
      playgroundTop + 700,
      playgroundBottom,
      0,
      700
    );
    window.addEventListener("scroll", () => {
      // use scrollFunction to get the translateX value of the carousel
      carousel.style.transform = `translateX(-${scrollFunction(
        window.scrollY
      )}00%)`;
    });
  }, []);

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
        <div className="w-full h-60 mb-24">
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
      <div className="w-48 h-48 absolute right-0 bottom-0">
        <Lottie
          className="w-full h-full"
          animationData={ArrowDown}
          loop={true}
        />
      </div>
      <HomePageTitle title="# // ABOUT ME " />
      <HomePageTitle title="# // PROJECTS " />
      <HomePageTitle title="# // MY LIFE JOURNEY " />
      <div
        className="animation-playground bg-black"
        style={{ height: "6500px" }}
      >
        {/* Lottie */}
        <div className="lottie-container sticky top-[400px] w-full flex justify-center h-80 z-20">
          <Lottie animationData={walkAnimation} loop={true} />
        </div>

        <div
          id="carousel-container"
          className="carousel-container h-screen sticky top-0 overflow-hidden"
          style={{
            transform: "translateX(0%)",
            transition: "transform 1s ease-in-out",
          }}
        >
          {/* Carousel  */}
          <div className="carousel flex flex-row w-full h-full transition-transform duration-300 ease-linear">
            {Array.from({ length: 7 }, (_, i) => (
              <div
                key={i + 1}
                className={`carousel-item min-w-full flex items-center justify-center bg-${
                  [
                    "blue",
                    "red",
                    "green",
                    "yellow",
                    "indigo",
                    "pink",
                    "purple",
                  ][i]
                }-600 text-white text-2xl`}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/resources/education/${
                    i + 1
                  }.png`}
                  className="w-full h-full"
                  alt={`Education ${i + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-10 right-10 bg-white text-black rounded-full text-4xl p-3 shadow-lg transform transition-all duration-1000 ${
            showBackToTop ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
          style={{ width: "60px", height: "60px" }}
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default HomePage;
