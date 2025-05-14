import React, { useEffect, useState, useRef } from "react";
import Lottie from "lottie-react";
import ArrowAnimation from "../animation/arrowLoad.json";
import ArrowDown from "../animation/arrowDown.json";
import walkAnimation from "../animation/astronaut.json";
import { createAnimationFunction } from "../utils/animation";
import HomePageTitle from "../components/HomePageTitle";
import { useNavigate } from "react-router-dom";
import { Carousel } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Pagination, Autoplay } from "swiper/modules";

const HomePage = () => {
  const navigate = useNavigate();
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
  const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  const coverBaseURL = `${process.env.PUBLIC_URL}/resources/cover/`;

  const coverList = [
    {
      filename: "drone.png",
      title: "Drone Simulation",
    },
    {
      filename: "fastai.png",
      title: "Fast AI Movie",
    },
    {
      filename: "stereo.png",
      title: "Stereo Reconstruction",
    },
    {
      filename: "vehicleIdentification.png",
      title: "Vehicle Identification Task Based on Vehicle Noise",
    },
    {
      filename: "innocoso.png",
      title: "Innocoso Web Platform",
    },
    {
      filename: "dilab.png",
      title: "TUM DI-Lab Multi-Agent System",
    },
  ];

  const IntroductionText =
    "Hi, I'm Xiaoheng Hu, a passionate developer constantly exploring the frontiers of technology. From Web Development and LLM to DevOps, I thrive on solving complex problems with innovative solutions. Whether building open dialogue platforms or developing real-time data management tools, I love turning ideas into reality through code. I’m driven by the excitement of learning and creating, and I'm always eager to take on new challenges and push the boundaries of what's possible.";

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
      <HomePageTitle title="// ABOUT ME " />
      <div className="w-full flex justify-center items-center bg-black text-lg leading-relaxed px-24 py-10">
        {IntroductionText}
      </div>
      <div className="w-full text-end bg-black text-2xl font-bold px-10 underline">
        <button
          className="underline"
          onClick={() => {
            navigate("/about");
            window.scrollTo(0, 0);
          }}
        >
          More about me
        </button>
      </div>
      <HomePageTitle title="// PROJECTS " />
      {/* <div className="w-full flex justify-center items-center bg-black text-lg h-60  ">
        <Carousel autoplay>
          {coverList.map((cover, index) => (
            <div className="text-white w-full h-30" key={index}>
              {index}
              <img
                src={`${process.env.PUBLIC_URL}/resources/cover/stereo.jpg`}
                alt={`Cover ${index + 1}`}
                style={contentStyle}
              />
            </div>
          ))}
        </Carousel>
      </div> */}

      <div className="w-full flex justify-center items-center bg-black text-lg leading-relaxed px-24 py-10">
        <Swiper
          className="w-[80%] h-96 flex justify-center items-center"
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{ delay: 3000 }}
          modules={[Pagination, Autoplay]}
        >
          {coverList.map((cover, index) => (
            <SwiperSlide
              key={index}
              className="hover:cursor-pointer relative"
              onClick={() => navigate(`/projects?tab=${index + 1}`)}
            >
              <div className="relative w-full h-96">
                <div className="absolute inset-0 bg-gradient-to-r from-white via-black/60 to-black z-10" />
                <img
                  src={`${coverBaseURL}${cover.filename}`}
                  alt={cover.title}
                  className="w-full h-full object-contain lg:object-cover"
                />
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white z-20 w-1/3 flex justify-center pr-10">
                  <h2 className="text-5xl font-bold break-words leading-tight text-center">
                    {cover.title}
                  </h2>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <HomePageTitle title="// MY LIFE JOURNEY " />
      <div
        className="animation-playground bg-black"
        style={{ height: "6500px" }}
      >
        {/* Lottie */}
        <div className="lottie-container sticky top-[400px] w-full flex justify-center h-80 z-20">
          <Lottie
            className="w-full md:w-auto h-full"
            animationData={walkAnimation}
            loop={true}
          />
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
                  className="w-full h-full object-contain md:object-cover"
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
          className={`fixed bottom-10 right-10 bg-white text-black rounded-full text-3xl p-3 shadow-lg transform transition-all duration-1000 ${
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
