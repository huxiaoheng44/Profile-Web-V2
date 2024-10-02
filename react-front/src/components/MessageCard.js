import React, { useEffect, useState, useMemo } from "react";
import { BASE_URL } from "../config/config";
import { useUser } from "../UserContext";

const MessageCard = ({ message }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const { userId, triggerBlink, triggerCursorMessage } = useUser();

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await fetch(
          `${BASE_URL}/api/comments/${message.messageId}`
        );
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }

    if (message.messageId) {
      fetchComments();
    }
  }, [message.messageId]);

  const commentAvatars = useMemo(() => {
    const avatars = {};
    comments.forEach((comment) => {
      const seed =
        parseInt(comment._id, 16) || Math.floor(Math.random() * 1000);
      const avatarIndex = (seed % 6) + 1;
      const avatarFilename = `${avatarIndex}.png`;
      const avatarPath = `${process.env.PUBLIC_URL}/comment-avatar/${avatarFilename}`;
      avatars[comment._id] = avatarPath;
    });
    return avatars;
  }, [comments]);

  function handleAddComment() {
    // if user is not logged in, trigger the blink effect
    if (!userId) {
      triggerBlink();
      triggerCursorMessage("Please log in first.");
      return;
    }

    const commentMsg = {
      parentId: message.messageId,
      author: "Anonymous",
      content: newComment,
      date: new Date().toISOString(),
    };

    try {
      fetch(`${BASE_URL}/api/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentMsg),
      }).then((response) => {
        if (response.ok) {
          setNewComment("");
        }
        // add current comment to the comments array
        setComments([...comments, commentMsg]);
      });
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  }

  // Function to auto-expand the textarea as user types
  function handleTextareaChange(e) {
    setNewComment(e.target.value);
    e.target.style.height = "auto"; // Reset the height
    e.target.style.height = `${e.target.scrollHeight}px`; // Set the height based on scroll height
  }

  return (
    <div>
      <div className="text-white p-4 rounded-md shadow-lg border-primary">
        <div className="message-author text-xl font-bold mb-2">
          {message.author}
        </div>
        <div className="message-date text-xs text-gray-400 flex items-center">
          {message.date}
        </div>
        <div className="text-lg p-4 text-center">{message.content}</div>

        <div className="border-t-2 border-zinc-600"></div>
        <div className="h-48 px-2 overflow-y-auto scrollbar-thin scrollbar-thumb-white scrollbar-track-transparent">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment._id}
                className="comment-container w-full flex flex-row py-2 justify-between"
              >
                <div className="comment-avatar flex items-center w-min-10 h-12 shrink-0 ">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={commentAvatars[comment._id]}
                    alt="comment-avatar"
                  ></img>
                </div>
                <div className="flex-grow pl-3">
                  <div className="comment-user-info flex flex-row justify-between">
                    <div> {comment.author}</div>
                    <div className="text-xs text-gray-400 flex items-center">
                      {" "}
                      {comment.date}
                    </div>
                  </div>
                  <div className="comment-content text-sm ">
                    {comment.content}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No comments yet.</div>
          )}
        </div>
        <div className="flex mt-4 px-1 h-auto">
          <textarea
            rows="1"
            placeholder="Add a comment"
            value={newComment}
            onChange={handleTextareaChange}
            className="flex-grow px-4 py-2 mr-2 text-white bg-black rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none overflow-hidden"
          />
          <button
            className="px-4 py-2 bg-primary text-white border-gray-300 border rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            onClick={handleAddComment}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
