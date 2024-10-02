import "./App.css";
import BlendeCursor from "./components/BlendeCursor";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import AboutMePage from "./pages/AboutMe";
import MessageBoardPage from "./pages/MessageBoard";
import { UserProvider } from "./UserContext";

function App() {
  return (
    <UserProvider>
      <div className="App bg-black w-full flex flex-col box-border">
        <div className="flex-grow box-border">
          <Navigation />
          <BlendeCursor />
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/about" element={<AboutMePage />} />
            <Route path="/contact" element={<MessageBoardPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </UserProvider>
  );
}

export default App;
