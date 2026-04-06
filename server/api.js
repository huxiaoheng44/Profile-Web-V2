const express = require("express");

const router = express.Router();

const Message = require("./models/message");
const Comment = require("./models/comment");
const mongoose = require("mongoose");
const auth = require("./auth");

const memoryMessages = [];
const memoryComments = [];

function isDatabaseReady() {
  return mongoose.connection.readyState === 1;
}

router.get("/messages", async (req, res, next) => {
  try {
    const messages = isDatabaseReady()
      ? await Message.find({}).sort({ date: -1 })
      : [...memoryMessages].sort(
          (left, right) => new Date(right.date) - new Date(left.date)
        );

    res.send(messages);
  } catch (error) {
    next(error);
  }
});

router.post("/message", async (req, res, next) => {
  try {
    const { messageId, author, content, date } = req.body;

    if (!content || typeof content !== "string" || content.trim() === "") {
      return res.status(400).json({ message: "Content is required" });
    }

    const savedMessage = {
      messageId: messageId || Date.now().toString(),
      author: author || "Anonymous",
      content: content.trim(),
      date: date ? new Date(date) : new Date(),
    };

    if (isDatabaseReady()) {
      const newMessage = new Message(savedMessage);
      await newMessage.save();
      res.status(201).send(newMessage);
      return;
    }

    memoryMessages.unshift(savedMessage);
    res.status(201).send(savedMessage);
  } catch (error) {
    next(error);
  }
});

router.get("/comments/:parentId", async (req, res, next) => {
  try {
    const { parentId } = req.params;
    const comments = isDatabaseReady()
      ? await Comment.find({ parentId }).sort({ date: 1 })
      : memoryComments
          .filter((comment) => comment.parentId === parentId)
          .sort((left, right) => new Date(left.date) - new Date(right.date));

    res.send(comments);
  } catch (error) {
    next(error);
  }
});

router.post("/comment", async (req, res, next) => {
  try {
    const { parentId, author, content, date } = req.body;

    if (!parentId || typeof parentId !== "string") {
      return res.status(400).json({ message: "Valid parentId is required" });
    }

    if (!content || typeof content !== "string" || content.trim() === "") {
      return res.status(400).json({ message: "Content is required" });
    }

    const savedComment = {
      parentId,
      author: author || "Anonymous",
      content: content.trim(),
      date: date ? new Date(date) : new Date(),
    };

    if (isDatabaseReady()) {
      const newComment = new Comment(savedComment);
      await newComment.save();
      res.status(201).send(newComment);
      return;
    }

    memoryComments.push(savedComment);
    res.status(201).send(savedComment);
  } catch (error) {
    next(error);
  }
});

router.post("/login", auth.login);

router.get("/test", (req, res) => {
  res.send({
    message: "Congratulations you passed the test",
    databaseConnected: isDatabaseReady(),
  });
});

router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
