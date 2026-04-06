require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const api = require("./api.js");

const mongoConnectionURL = process.env.MONGODB_URL;
const databaseName = process.env.MONGODB_DATABASE || "xiaoheng-web";
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:3000"];

mongoose.set("bufferCommands", false);

const options = {
  dbName: databaseName,
};

if (mongoConnectionURL) {
  mongoose
    .connect(mongoConnectionURL, options)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(`Error connecting to MongoDB: ${err}`));
} else {
  console.log("MONGODB_URL is not set, running without MongoDB.");
}

// Create a express server
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use("/api", api);

// server error handle
app.use((err, req, res, next) => {
  const status = err.status || 500;
  if (status === 500) {
    // 500 means Internal Server Error
    console.log("The server errored when processing a request!");
    console.log(err);
  }

  res.status(status);
  res.send({
    status: status,
    message: err.message,
  });
});

// start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
