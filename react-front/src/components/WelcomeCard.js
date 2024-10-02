import React, { useEffect, useState } from "react";
import GoogleLogoutButton from "./Buttons/GoogleLogout";
import GoogleLoginButton from "./Buttons/GoogleLogin";
import { useUser } from "../UserContext";
import { BASE_URL } from "../config/config";

const WelcomeCard = ({ messages, setMessages }) => {
  const { userId, userName, shouldBlink } = useUser();
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [messageContent, setMessageContent] = useState(""); // Holds message content

  // Monitor user state
  useEffect(() => {
    console.log("userId:", userId);
    console.log("userName:", userName);
  }, [userId, userName, shouldBlink]);

  const handleAnonymousChange = (e) => {
    setIsAnonymous(e.target.checked);
  };

  // Handle Post button click
  const handlePostMessage = async () => {
    const author = isAnonymous ? "Anonymous" : userName;

    const newMessage = {
      messageId: messages.length, // or generate a unique ID
      author,
      content: messageContent,
      date: new Date().toISOString(),
    };

    try {
      const response = await fetch(`${BASE_URL}/api/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessage),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Message posted:", result);
        // Clear the textarea after posting the message
        setMessageContent("");
        // add the new message to the messages list
        setMessages((messages) => [result, ...messages]);
      } else {
        console.error("Failed to post message:", response.statusText);
      }
    } catch (error) {
      console.error("Error posting message:", error);
    }
  };

  return (
    <div className="text-white p-4 rounded-md shadow-lg border-primary flex flex-col justify-between h-full relative">
      {userId ? (
        <>
          <div className="flex flex-row justify-between">
            {/* Username with optional strikethrough */}
            <div className="text-xl font-bold">
              <span className={`${isAnonymous ? "line-through" : ""}`}>
                {userName}
              </span>
              <span>{isAnonymous && " (Nobody Knows)"}</span>
            </div>

            {/* Logout button in top right corner */}
            <div className="absolute right-2 top-2">
              <GoogleLogoutButton />
            </div>
          </div>

          {/* TextArea for message input */}
          <textarea
            className="w-full h-3/5 bg-black border-2 border-zinc-600 text-white p-2 rounded-md mt-8"
            placeholder="Write your message here..."
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
          ></textarea>

          {/* Footer section with anonymous checkbox and Post button */}
          <div className="flex justify-between items-center mt-auto">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="anonymous"
                checked={isAnonymous}
                onChange={handleAnonymousChange}
                className="mr-2 w-4 h-4"
              />
              <label htmlFor="anonymous">Anonymous</label>
            </div>
            <button
              onClick={handlePostMessage}
              className="px-4 py-2 bg-primary text-white border-gray-300 border rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 mt-2"
            >
              Post
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-xl font-bold mb-2">Welcome to Message Board</div>
          <p className="mb-4">Please log in with Google to leave a message.</p>
          <div
            style={{
              position: "relative",
              display: "inline-block",
              cursor: "pointer",
            }}
            className={shouldBlink ? "animate-faster-bounce" : ""}
          >
            <GoogleLoginButton />
            {/* cover GoogleLoginButton */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0)", // transparent
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomeCard;
