import React, { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);
  const [shouldBlink, setShouldBlink] = useState(false);
  const [cursorMessage, setCursorMessage] = useState("");

  // Function to trigger blinking effect
  const triggerBlink = () => {
    setShouldBlink(true);
    setTimeout(() => setShouldBlink(false), 2000); // Reset after a short delay
  };

  // Function to trigger a cursor message
  const triggerCursorMessage = (message) => {
    setCursorMessage(message);
    setTimeout(() => setCursorMessage(""), 2000); // Reset after a short delay
  };

  // Load user information from sessionStorage when the component mounts
  useEffect(() => {
    const storedUserId = sessionStorage.getItem("userId");
    const storedUserName = sessionStorage.getItem("userName");
    const storedUserAvatar = sessionStorage.getItem("userAvatar");

    if (storedUserId) setUserId(storedUserId);
    if (storedUserName) setUserName(storedUserName);
    if (storedUserAvatar) setUserAvatar(storedUserAvatar);
  }, []);

  // Save user information to sessionStorage whenever it changes
  useEffect(() => {
    if (userId) {
      sessionStorage.setItem("userId", userId);
    } else {
      sessionStorage.removeItem("userId");
    }

    if (userName) {
      sessionStorage.setItem("userName", userName);
    } else {
      sessionStorage.removeItem("userName");
    }

    if (userAvatar) {
      sessionStorage.setItem("userAvatar", userAvatar);
    } else {
      sessionStorage.removeItem("userAvatar");
    }
  }, [userId, userName, userAvatar]);

  const value = {
    userId,
    setUserId,
    userName,
    setUserName,
    userAvatar,
    setUserAvatar,
    shouldBlink,
    triggerBlink,
    cursorMessage,
    triggerCursorMessage,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
