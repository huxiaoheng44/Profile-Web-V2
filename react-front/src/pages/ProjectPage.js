import React, { useEffect } from "react";
import PDFReader from "../components/PdfReader";
import { useSearchParams } from "react-router-dom";
import { Tabs } from "antd";

const { TabPane } = Tabs;

const ProjectPage = () => {
  const pdfBaseURL = `${process.env.PUBLIC_URL}/resources/pdf/`;
  const videoBaseURL = `${process.env.PUBLIC_URL}/resources/videos/`;

  const [searchParams] = useSearchParams();
  const defaultActiveKey = searchParams.get("tab") || "1";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const projects = [
    {
      title: "3D Reconstruction",
      description: "This tab displays the 3D Reconstruction project.",
      pdf: `${pdfBaseURL}3DReconstruction.pdf`,
      video: `${videoBaseURL}3D.mp4`,
    },
    {
      title: "Drone Simulator",
      description: "This tab shows the Drone Simulator project.",
      pdf: `${pdfBaseURL}Drone.pdf`,
      video: `${videoBaseURL}DroneDemo.mp4`,
    },
    {
      title: "FAST AI Movie",
      description: "This tab is for FAST AI Movie project.",
      pdf: `${pdfBaseURL}FASTAIMOVIE.pdf`,
      video: `${videoBaseURL}FASTAIMOVIE.mp4`,
    },
    {
      title: "Vehicle identification",
      description: "This tab showcases the Muller BBM project.",
      pdf: `${pdfBaseURL}VehicleIdentification.pdf`,
    },
  ];

  return (
    <div className="w-full h-min-[100vh] bg-black text-white relative">
      <Tabs
        defaultActiveKey="1"
        centered
        className="test-white bg-inherit pb-10"
      >
        {projects.map((project, index) => (
          <TabPane
            tab={project.title}
            key={index + 1}
            defaultActiveKey={defaultActiveKey}
          >
            <div className="flex flex-col bg-inherit items-center">
              {/* <p className="text-xl mb-4">{project.description}</p> */}
              <PDFReader pdfUrl={project.pdf} />
            </div>
            <div>
              {project.video && (
                <div className="bg-inherit flex justify-start items-center flex-col ">
                  <hr className="w-[90%] h-[2px] bg-zinc-600 border-none my-10 mx-20" />
                  <h2 className="text-5xl mb-4 text-white w-full text-center font-bold pb-10">
                    Video Demo
                  </h2>
                  <video
                    src={project.video}
                    controls
                    className="w-3/4 h-auto bg-inherit"
                    onError={(e) => console.error("Video failed to load:", e)}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </div>
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default ProjectPage;
