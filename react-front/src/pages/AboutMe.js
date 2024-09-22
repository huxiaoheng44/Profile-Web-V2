import React, { useEffect, useState } from "react";
import { createAnimationFunction } from "../utils/animation";
import LightUp from "../components/LightUp";
import Lottie from "lottie-react";
import walkAnimation from "../animation/astronaut.json";
import Hobby from "../components/Hobby";

const AboutMePage = () => {
    const [isLighted, setIsLighted] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);

    const handleLightUp = () => {
        setIsLighted(true);
    };

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

    return (
        <div className="text-white">
            <div className="absolute left-0 top-20 w-full z-30" style={{ height: 'calc(100vh - 5rem)' }}>
                <LightUp />
                {/* <div className="lighted-bg-floor w-full h-32">floor</div> */}
            </div>

            <div className="lighted-bg section h-screen flex justify-center items-center bg-black relative">
                {/* mask layer */}
                <div className="lighted-cover absolute inset-0 bg-black opacity-80 z-10 " style={{ height: '200vh' }} ></div>

                <div className="flex justify-center items-center">
                    <img
                        src={`${process.env.PUBLIC_URL}/resources/images/avatar.jpg`}
                        alt="Profile"
                        className="lighted w-96 h-96 rounded-full object-cover "
                    />
                </div>


                <div className="text-white lighted p-10 mx-20 rounded-xl text-left px-10 w-96 h-96 flex flex-col justify-center">
                    <p className="lighted-tag py-2 text-4xl font-bold rounded-full flex justify-center mb-10">Xiaoheng Hu</p>
                    <div className="flex flex-wrap mt-4">
                        <span className="bg-gray-900 lighted-tag text-white py-1 px-3 rounded-full mr-2 mb-2">#Web Development</span>
                        
                        <span className="bg-gray-900 lighted-tag text-white py-1 px-3 rounded-full mr-2 mb-2">#DevOps</span>
                        <span className="bg-gray-900 lighted-tag text-white py-1 px-3 rounded-full mr-2 mb-2">#LLM</span>
                        <span className="bg-gray-900 lighted-tag text-white py-1 px-3 rounded-full mr-2 mb-2">#JavaScript</span>
                        <span className="bg-gray-900 lighted-tag text-white py-1 px-3 rounded-full mr-2 mb-2">#React</span>
                        <span className="bg-gray-900 lighted-tag text-white py-1 px-3 rounded-full mr-2 mb-2">#Node.js</span>
                        <span className="bg-gray-900 lighted-tag text-white py-1 px-3 rounded-full mr-2 mb-2">#CI/CD</span>
                        <span className="bg-gray-900 lighted-tag text-white py-1 px-3 rounded-full mr-2 mb-2">#Docker</span>
                        <span className="bg-gray-900 lighted-tag text-white py-1 px-3 rounded-full mr-2 mb-2">#Kubernetes</span>
                        {/* Add more tags as needed */}
                    </div>
                </div>
            </div>

            <div className="lighted-bg2 section h-screen flex flex-col justify-center items-center bg-black z-30">
                <h2 className="text-2xl font-semibold">Some content after</h2>
                <Hobby/>
            </div>


            <div className="animation-playground" style={{ height: "6500px" }}>
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
                    {/* Carousel  */}
                    <div className="carousel flex flex-row w-full h-full transition-transform duration-300 ease-linear">
                        {Array.from({ length: 7 }, (_, i) => (
                            <div
                                key={i + 1}
                                className={`carousel-item min-w-full flex items-center justify-center bg-${['blue', 'red', 'green', 'yellow', 'indigo', 'pink', 'purple'][i]}-600 text-white text-2xl`}
                            >
                                <img
                                    src={`${process.env.PUBLIC_URL}/resources/education/${i + 1}.png`}
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
                        showBackToTop ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                    }`}
                    
                    
                    style={{ width: "60px", height: "60px" }}
                >
                    ↑
                </button>
            )}
        </div>
    );
};

export default AboutMePage;
