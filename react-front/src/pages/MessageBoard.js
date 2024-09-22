import React from "react";
import MessageCard from "../components/MessageCard";

const messages = [
  { id: 1, author: "Message 1", content: "This is the first message." , date: "2021-09-01"},
  { id: 2, author: "Message 2", content: "This is the second message." ,date: "2021-09-02"},
  { id: 3, author: "Message 3", content: "This is the third message." ,date: "2021-09-03"},
];

const MessageBoard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 min-h-screen">
      {messages.map((message) => (
        <MessageCard key={message.id} message={message} />
      ))}
    </div>
  );
};

export default MessageBoard;
