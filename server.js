#!/usr/bin/env node

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const history = require("connect-history-api-fallback");
const http = require("http");

const APPLICATION_NAME = "theresienstadt-explained";
const PORT = normalizePort(process.env.PORT || "3000");

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(history());

// Routes
require("./routes/acl")(app);

// Error handling
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

// Create and configure server
const server = http.createServer(app);
server.setMaxListeners(0);

// Start server
server.listen(PORT, () => {
  console.log(
    "---------------------------------------------------------------"
  );
  console.log('Server started for application "' + APPLICATION_NAME + '"');
  console.log("Port: " + PORT);
  console.log("Environment: " + (process.env.NODE_ENV || "development"));
  console.log(
    "---------------------------------------------------------------"
  );
});

server.on("error", onError);
server.on("listening", onListening);

// Graceful shutdown
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

function normalizePort(val) {
  const port = parseInt(val, 10);
  return isNaN(port) ? val : port >= 0 ? port : false;
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof PORT === "string" ? "Pipe " + PORT : "Port " + PORT;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Listening on " + bind);
}

function shutdown() {
  console.log("\nShutting down gracefully...");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });

  setTimeout(() => {
    console.error("Forced shutdown");
    process.exit(1);
  }, 10000);
}
