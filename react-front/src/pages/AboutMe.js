import React, { useState } from "react";
import LightUp from "../components/LightUp";
import Hobby from "../components/Hobby";
import { useUser } from "../UserContext";
import { Timeline } from "antd";
import { FaBook, FaBriefcase, FaLightbulb } from "react-icons/fa";
import { AiOutlineMeh } from "react-icons/ai";

const AboutMePage = () => {
  const [isLighted, setIsLighted] = useState(false);
  const [addHoverBallToWorld, setAddBasketBallToWorld] = useState(null);
  const [activateRacket, setActivateRacket] = useState(null);
  const [activatePingPang, setActivatePingPang] = useState(null);
  const { triggerCursorMessage } = useUser();

  const tags = [
    "Web Development",
    "DevOps",
    "LLM",
    "JavaScript",
    "React",
    "Node.js",
    "CI/CD",
    "Docker",
    "Kubernetes",
  ];

  const timelineData = [
    {
      title: "Infineon Technologies AG",
      description: {
        position: "Platform Engineer(Working Student)",
        details: [
          "Develop and maintain the internal developer portal to streamline engineering workflows.",
          "Assisted in enhancing and maintaining project CI/CD pipelines.",
          "Supported the migration of repository workflows, standardized internal development practices.",
        ],
      },
      time: "December 2024 - June 2025",
      icon: (
        <FaBriefcase
          style={{
            color: "white",
            backgroundColor: "transparent",
            fontSize: "1.5rem",
          }}
        />
      ),
    },
    {
      title: "Innocoso Order Management System",
      description: {
        position: "Full-stack Developer(Working Student)",
        details: [
          "Developed and deployed a full-featured order management platform with functionalities including advance search, filtering, and PDF export.",
          "Implemented dynamic data visualization dashboards using Ant Design's specialized visualization library, enabling multi-dimensional analysis and comparison of order information.",
          "Designed intuitive user interfaces for monitoring key order metrics, supporting business decision-making through clear visual summaries.",
        ],
      },
      time: "July 2024 - December 2024",
      icon: (
        <FaBriefcase
          style={{
            color: "white",
            backgroundColor: "transparent",
            fontSize: "1.5rem",
          }}
        />
      ),
    },
    {
      title: "Müller-BBM Vehicle Identification Task Based on Vehicle Noise",
      description: {
        position: "Vehicle Identification Task",
        details: [
          "Develop a classification method for passenger cars and heavy vehicles based on features extracted from audio recordings and additional sensor data.",
          "Developed solutions based on traditional machine learning and neural networks-based algorithms, achieving a maximum accuracy of 87%.",
        ],
      },
      time: "January 2024 - January 2024",
      icon: (
        <FaLightbulb
          style={{
            color: "white",
            backgroundColor: "transparent",
            fontSize: "1.5rem",
          }}
        />
      ),
    },
    {
      title: "FAST AI Movies - Front-end Development Intern",
      description: {
        position: "Front-end Development Intern",
        details: [
          "Developed a content editing page for texts, audio and images.",
          "Enabled customization of the focus area on slides.",
          "Implemented image upload and inserting images into text box functionalities.",
        ],
      },
      time: "September 2023 - March 2024",
      icon: (
        <FaBriefcase
          style={{
            color: "white",
            backgroundColor: "transparent",
            fontSize: "1.5rem",
          }}
        />
      ),
    },
    {
      title: "Python Artifact Logger&Viewer Module",
      description: {
        position: "Python Artifact Logger&Viewer Module",
        details: [
          "Developed a Flask-based backend server, enabling dynamic data presentation from and supporting data querying and visualization for artifact comparison.",
        ],
      },
      time: "October 2023 - February 2024",
      icon: (
        <FaLightbulb
          style={{
            color: "white",
            backgroundColor: "transparent",
            fontSize: "1.5rem",
          }}
        />
      ),
    },
    {
      title: "Personal Website Development (huxiaoheng.com)",
      description: {
        position: "Personal Website Development",
        details: [
          "Developed a platform for open dialogue, complete with a message card and comment features.",
          "Tech Stack: React (Front-end), Express.js (Back-end), MongoDB (Database), Docker (Deployment), Nginx (Reverse Proxy), Google Cloud (Server Hosting)",
        ],
      },
      time: "August 2023 - present",
      icon: (
        <FaLightbulb
          style={{
            color: "white",
            backgroundColor: "transparent",
            fontSize: "1.5rem",
          }}
        />
      ),
    },
    {
      title: "Drone Simulator Project",
      description: {
        position: "Drone Simulator Project",
        details: [
          "Constructed a comprehensive drone control system integrated with PX4 autopilot with a companion application based on seL4 microkernel OS.",
          "Developed a C++ proxy for sensor data transmission to the companion computer and converted raw sensor data into structured data types for precise control and monitoring.",
        ],
      },
      time: "February 2023 - August 2023",
      icon: (
        <FaLightbulb
          style={{
            color: "white",
            backgroundColor: "transparent",
            fontSize: "1.5rem",
          }}
        />
      ),
    },
    {
      title: "Technical University of Munich",
      description: {
        position: "Informatics Master",
        details: [
          "Relevant Courses: Computer Vision II: Multiple View Geometry, 3D Scanning & Motion Capture, Cloud Information Systems, Natural Language Processing, Advanced Computer Networking",
        ],
      },
      time: "October 2022 - present",
      icon: (
        <FaBook
          style={{
            color: "white",
            backgroundColor: "transparent",
            fontSize: "1.5rem",
          }}
        />
      ),
    },
    {
      title: "Huawei - Software Engineer",
      description: {
        position: "Software Engineer",
        details: [
          "Developed advanced-specific optimization strategies for the optimization level in the compiler.",
          "Monitored CI/CD pipelines and developed scripts to automate and enhance workflow efficiency.",
        ],
      },
      time: "September 2021 - July 2022",
      icon: (
        <FaBriefcase
          style={{
            color: "white",
            backgroundColor: "transparent",
            fontSize: "1.5rem",
          }}
        />
      ),
    },
    {
      title: "Wuhan University of Technology",
      description: {
        position: "Software Engineering Bachelor ",
        details: [
          "Grade: 4.103 / 5.0",
          "Relevant Courses: Data Structures and Algorithms, Computer Architecture, Operating Systems, Database Systems, Network Principles, Software Engineering, Discrete Mathematics",
        ],
      },
      time: "September 2017 - July 2021",
      icon: (
        <FaBook
          style={{
            color: "white",
            backgroundColor: "transparent",
            fontSize: "1.5rem",
          }}
        />
      ),
    },
  ];

  const handleLightUp = () => {
    setIsLighted(true);
  };

  const handleBasketballActivation = () => {
    if (addHoverBallToWorld) {
      addHoverBallToWorld();
    }
  };

  const handlePingPangActivation = () => {
    if (activateRacket) {
      activateRacket();
    }
    if (activatePingPang) {
      activatePingPang();
    }
  };

  const handleVideoGamesActivation = () => {
    triggerCursorMessage("Nothing will happen here.");
  };

  return (
    <div className="text-white bg-black min-h-[430vh]">
      {" "}
      <div
        className="absolute left-0 top-20 w-full z-30"
        style={{ height: "calc(100vh - 5rem)" }}
      >
        <LightUp />
      </div>
      <div className="lighted-bg section h-screen flex flex-col justify-start items-center bg-black relative">
        <div className="w-full text-5xl text-center font-bold p-20">
          MY PROFILE
        </div>
        <div
          className="lighted-cover absolute inset-0 bg-black opacity-80 z-20"
          style={{ height: "430vh" }}
        ></div>
        <div className=" w-full flex justify-center items-center">
          <div className="flex justify-center items-center">
            <img
              src={`${process.env.PUBLIC_URL}/resources/images/avatar.jpg`}
              alt="Profile"
              className="lighted w-96 h-96 rounded-full object-cover"
            />
          </div>

          <div className="text-white lighted p-10 mx-20 rounded-xl text-left px-10 w-96 min-h-96 flex flex-col justify-center">
            <p className="lighted-tag py-2 text-4xl font-bold rounded-full flex justify-center mb-10">
              Xiaoheng Hu
            </p>
            <div className="flex flex-wrap mt-4">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="lighted-tag bg-gray-900 text-white py-1 px-3 rounded-full mr-2 mb-2"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="lighted-bg2 h-screen section flex flex-col justify-start items-center bg-black z-30">
        <div className="w-full text-5xl text-center font-bold pb-20">
          MY EXPERIENCE
        </div>
        <div className="ml-[-40vw]">
          <Timeline mode="left">
            {timelineData.map((item, index) => (
              <Timeline.Item
                key={index}
                label={item.time}
                dot={item.icon}
                className="text-white font-bold flex gap-6"
              >
                <div className="text-white font-bold text-2xl mt-[-5px]">
                  {item.title}
                </div>
                <p className="text-white font-bold">
                  {item.description.position}
                </p>
                <ul className="text-white font-semibold list-disc pl-5">
                  {item.description.details.map((detail, index) => (
                    <li key={index} className="whitespace-normal">
                      {detail}
                    </li>
                  ))}
                </ul>
              </Timeline.Item>
            ))}
          </Timeline>
        </div>
      </div>
      <div className="w-full h-96 my-20"></div>
      <div className="lighted-bg2 min-h-screen section flex flex-col justify-start items-center bg-black z-10 relative overflow-hidden pb-48">
        <div className="w-full text-5xl text-center font-bold mb-20 pt-20">
          MY HOBBIES
        </div>

        <div className="absolute top-[28%] right-48">
          <button
            className="text-5xl font-bold"
            onClick={handleBasketballActivation}
          >
            Basketball
          </button>
        </div>

        <div className="absolute top-[42%] left-24">
          <button
            className="text-5xl font-bold"
            onClick={handlePingPangActivation}
          >
            Ping Pong
          </button>
        </div>

        <div className="w-full h-screen flex items-center justify-center">
          <Hobby
            setAddBasketBallToWorld={setAddBasketBallToWorld}
            setActivatePingPang={setActivatePingPang}
            setActivateRacket={setActivateRacket}
          />
        </div>

        <div className="absolute bottom-16 right-52 flex items-center bg-black">
          <img
            className="w-32 h-24 object-fit mx-10"
            alt="game"
            src={`${process.env.PUBLIC_URL}/resources/hobby/game.png`}
          />
          <button
            className="text-5xl font-bold"
            onClick={handleVideoGamesActivation}
          >
            Video Games
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutMePage;
