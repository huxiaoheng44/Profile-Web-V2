import "./App.css";
import BlendeCursor from "./components/BlendeCursor";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import AboutMePage from "./pages/AboutMe";
import MessageBoardPage from "./pages/MessageBoard";
import { UserProvider } from "./UserContext";
import ProjectPage from "./pages/ProjectPage";
import NotFoundPage from "./pages/NotFound";

function App() {
  return (
    <UserProvider>
      <div className="App bg-black w-full flex flex-col box-border min-h-screen">
        <div className="flex-grow box-border bg-black">
          <Navigation />
          <BlendeCursor />
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/about" element={<AboutMePage />} />
            <Route path="/projects" element={<ProjectPage />} />
            <Route path="/contact" element={<MessageBoardPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </UserProvider>
  );
}

export default App;
