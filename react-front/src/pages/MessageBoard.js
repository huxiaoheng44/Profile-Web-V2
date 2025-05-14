import React, { useEffect, useState } from "react";
import MessageCard from "../components/MessageCard";
import { BASE_URL } from "../config/config";
import WelcomeCard from "../components/WelcomeCard";
import PersonalSocialMediaCard from "../components/PersonalSocialMediaCard";

const MessageBoard = () => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await fetch(`${BASE_URL}/api/messages`);
        const data = await response.json();
        // reverse the order of messages
        setMessages(data.reverse());
      } catch (error) {
        console.error(error);
      }
    }

    fetchMessages();
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 min-h-screen">
      <PersonalSocialMediaCard />
      <WelcomeCard messages={messages} setMessages={setMessages} />
      {messages.map((message) => (
        <MessageCard key={message._id} message={message} />
      ))}
    </div>
  );
};

export default MessageBoard;
