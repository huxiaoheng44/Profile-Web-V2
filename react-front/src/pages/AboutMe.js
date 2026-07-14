import React, { useState } from "react";
import LightUp from "../components/LightUp";
import Hobby from "../components/Hobby";
import { useUser } from "../UserContext";

const monthMap = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

const projectTimelineStart = 2023 * 12;
const projectTimelineEnd = 2026 * 12 + 11;
const projectTimelineToday = 2026 * 12 + 6;
const projectTimelineYears = [2023, 2024, 2025, 2026];

const parseMonthYear = (value) => {
  const [month, year] = value.trim().split(" ");
  return Number(year) * 12 + monthMap[month];
};

const getProjectTimelineRange = (dateRange) => {
  const [startText, endText] = dateRange.split(" - ");
  const start = parseMonthYear(startText);
  const end = parseMonthYear(endText);
  const total = projectTimelineEnd - projectTimelineStart;

  return {
    left: `${((start - projectTimelineStart) / total) * 100}%`,
    width: `${Math.max(((end - start + 1) / total) * 100, 1.3)}%`,
  };
};

const getProjectYearPosition = (year) =>
  `${(((year * 12 - projectTimelineStart) / (projectTimelineEnd - projectTimelineStart)) * 100).toFixed(2)}%`;

const getProjectTodayPosition = () =>
  `${(((projectTimelineToday - projectTimelineStart) / (projectTimelineEnd - projectTimelineStart)) * 100).toFixed(2)}%`;

const careerTimelineData = [
  {
    date: "Apr 2026 - Jul 2026",
    title: "System Engineer, PingPong Vision",
    org: "Digital Product School / UnternehmerTUM & MULTIVAC",
    summary:
      "Built and deployed an AI vision monitoring platform for industrial HMI screens, turning factory research and real machine testing into a camera-based monitoring workflow.",
    highlights: [
      "Translated insights from 15+ factory visits and manufacturing interviews into the product concept.",
      "Built a Gemini-based zero-shot vision-OCR pipeline with OpenCV perspective correction and LLM guardrails.",
      "Delivered a React, FastAPI, Flask, TimescaleDB, Docker, and Coolify monitoring workflow.",
    ],
  },
  {
    date: "Dec 2024 - Mar 2026",
    title: "Platform Engineer (Working Student)",
    org: "Infineon Technologies",
    summary:
      "Worked on a Backstage-based internal developer platform and cloud-native platform operations.",
    highlights: [
      "Designed golden path templates for service scaffolding, CI/CD practices, and Helm deployment patterns.",
      "Supported OpenShift lifecycle operations, GitOps-oriented workflows, and software catalog onboarding.",
      "Improved developer productivity through platform integrations and reusable onboarding workflows.",
    ],
  },
  {
    date: "Jul 2024 - Dec 2024",
    title: "Fullstack Developer (Working Student)",
    org: "Innocoso",
    summary:
      "Built backend and frontend modules for a B2B ERP platform handling production orders, workflows, RBAC, and dashboards.",
    highlights: [
      "Designed REST APIs, relational data models, validation logic, and business rules.",
      "Implemented authentication, role-based access control, and permission-aware workflows.",
      "Contributed to Docker, Nginx, AWS EC2/GCP, and CI/CD deployment workflows.",
    ],
  },
  {
    date: "Sep 2021 - Jul 2022",
    title: "Software Engineer (Compiler / LLVM / CI)",
    org: "Huawei",
    summary:
      "Scientific computation workloads, Linux compatibility, compiler build environments, and CI pipelines.",
    highlights: [
      "Contributed to Fortran-based scientific and meteorological computation workload optimization.",
      "Resolved Linux build, dependency, installation, and compatibility issues.",
      "Maintained Jenkins and GitLab CI pipelines for compiler build, test, and release workflows.",
    ],
  },
];

const educationTimelineData = [
  {
    date: "Oct 2022 - Mar 2026",
    title: "M.Sc. Informatics",
    org: "Technical University of Munich",
    summary:
      "Relevant courses include Cloud Information Systems, Advanced Computer Networking, Natural Language Processing, Multiple View Geometry, Distributed Systems, and Computer Vision II.",
  },
  {
    date: "Sep 2017 - Jul 2021",
    title: "B.Sc. Software Engineering",
    org: "Wuhan University of Technology",
    summary:
      "Relevant courses include Data Structures & Algorithms, Operating Systems, Computer Architecture, Database Systems, Network Principles, and Software Engineering.",
  },
];

const projectTableData = [
  {
    date: "Apr 2026 - Jul 2026",
    title: "PingPong Vision",
    role: "System Engineer",
    org: "Digital Product School / UnternehmerTUM & MULTIVAC",
    stack:
      "React, Vite, Tailwind CSS, ECharts, FastAPI, Flask, TimescaleDB, Gemini, OpenCV, Docker",
    outcome:
      "Built and validated an AI vision monitoring platform for industrial HMI screens on real MULTIVAC machines.",
  },
  {
    date: "Mar 2025 - Oct 2025",
    title: "Structured IR for LLM Code Generation",
    role: "Research Engineer",
    org: "Master Thesis, Technical University of Munich",
    stack: "LLM evaluation, prompt engineering, YAML, Mermaid, DSL, Python",
    outcome:
      "Improved LLM code-generation performance by 12-14% on complex tasks.",
  },
  {
    date: "Mar 2026 - Apr 2026",
    title: "Web Harvest RAG",
    role: "AI / Backend Engineer",
    org: "Personal Project",
    stack: "Python, RAG, embeddings, hybrid retrieval, BM25, REST APIs",
    outcome:
      "Built a source-grounded knowledge service for websites and documents.",
  },
  {
    date: "Sep 2024 - Feb 2025",
    title: "Multi-Agent System for Automated Software Development",
    role: "AI Fullstack Developer",
    org: "TUM-DI-LAB & Reply",
    stack: "LangGraph, LangChain, GraphQL, AWS Bedrock, Lambda, Terraform",
    outcome:
      "Created agentic workflows for planning, tickets, orchestration, and deployment.",
  },
  {
    date: "May 2024 - Oct 2024",
    title: "Personal Website Development - huxiaoheng.com",
    role: "Fullstack Developer",
    org: "Personal Project",
    stack: "React, Express.js, MongoDB, Docker, Nginx, GCP",
    outcome:
      "Built and deployed a full-stack portfolio for projects, blogs, and demos.",
  },
  {
    date: "Oct 2023 - Feb 2024",
    title: "Python Artifact Logger & Viewer",
    role: "Backend / DataOps Engineer",
    org: "Personal Project",
    stack: "Python, Flask, AWS S3, databases, artifact tracking, Dynatrace",
    outcome:
      "Built experiment artifact tracking and comparison dashboards.",
  },
  {
    date: "Feb 2023 - Aug 2023",
    title: "Drone Simulator Project",
    role: "Systems Developer",
    org: "Academic Project",
    stack: "C++, PX4, seL4, Raspberry Pi, sensor data, embedded systems",
    outcome:
      "Built drone control/simulation components and C++ sensor-data proxying.",
  },
];

const VerticalTimeline = ({ title, items }) => (
  <div className="works-section-panel">
    <div className="works-panel-title">{title}</div>
    <div className="profile-timeline">
      {items.map((item) => (
        <article className="profile-timeline-item" key={`${item.title}-${item.date}`}>
          <div className="profile-timeline-date">{item.date}</div>
          <div className="profile-timeline-card">
            <div className="profile-timeline-heading">
              <h3>{item.title}</h3>
              <span>{item.org}</span>
            </div>
            <p>{item.summary}</p>
            {item.highlights && (
              <ul>
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            )}
          </div>
        </article>
      ))}
    </div>
  </div>
);

const ProjectsTable = () => (
  <div className="works-section-panel">
    <div className="works-panel-title">PROJECT EXPERIENCE</div>
    <div className="projects-table-wrap">
      <table className="projects-table">
        <thead>
          <tr>
            <th>Project</th>
            <th>Time</th>
            <th>Role</th>
            <th>Stack</th>
            <th>Outcome</th>
          </tr>
        </thead>
        <tbody>
          {projectTableData.map((project) => (
            <tr key={`${project.title}-${project.date}`}>
              <td>
                <strong>{project.title}</strong>
                <span>{project.org}</span>
              </td>
              <td>{project.date}</td>
              <td>{project.role}</td>
              <td>{project.stack}</td>
              <td>{project.outcome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const ProjectsTimeline = () => (
  <div className="works-section-panel">
    <div className="works-panel-title">PROJECT TIMELINE (FROM 2023)</div>
    <div className="project-gantt-scroll">
      <div className="project-gantt">
        <div className="project-gantt-header">
          <div className="project-gantt-label">PROJECTS</div>
          <div className="project-gantt-axis">
            {projectTimelineYears.map((year) => (
              <span
                key={year}
                className="project-gantt-year"
                style={{ left: getProjectYearPosition(year) }}
              >
                {year}
              </span>
            ))}
          </div>
        </div>

        <div className="project-gantt-body">
          <div className="project-gantt-overlay">
            {projectTimelineYears.map((year) => (
              <div
                key={year}
                className="project-gantt-year-line"
                style={{ left: getProjectYearPosition(year) }}
              ></div>
            ))}
            <div
              className="project-gantt-today"
              style={{ left: getProjectTodayPosition() }}
            >
              <span>Today</span>
            </div>
          </div>

          {projectTableData.map((project) => {
            const range = getProjectTimelineRange(project.date);

            return (
              <div className="project-gantt-row" key={`${project.title}-timeline`}>
                <div className="project-gantt-name">{project.title}</div>
                <div className="project-gantt-track">
                  <div
                    className="project-gantt-bar"
                    style={range}
                    title={`${project.title} - ${project.date}`}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </div>
);

const ProfileWorks = () => (
  <section className="works-shell lighted">
    <div className="works-window-bar">
      <span>Profile Timeline</span>
      <div className="works-window-controls" aria-hidden="true">
        <span className="works-window-dot"></span>
        <span>−</span>
        <span>□</span>
        <span>×</span>
      </div>
    </div>

    <div className="works-content">
      <h2>Profile Timeline</h2>
      <p className="works-intro">
        Career, education, and project experience rebuilt from the latest
        source-of-truth profile data.
      </p>
      <div className="works-two-column">
        <VerticalTimeline title="CAREER EXPERIENCE" items={careerTimelineData} />
        <VerticalTimeline title="EDUCATION" items={educationTimelineData} />
      </div>
      <ProjectsTable />
      <ProjectsTimeline />
    </div>
  </section>
);

const AboutMePage = () => {
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
      <div className="lighted-bg2 section flex flex-col justify-start items-center bg-black z-30 py-24 px-6">
        <ProfileWorks />
      </div>
      <div className="w-full h-32 my-16"></div>
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
