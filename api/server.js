const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const authRouter = require("../auth/auth-router");
const logger = require("../middleware/logger");
const handleError = require("../middleware/handle-error-middleware");
const restrictedRoute = require("../middleware/restricted-route-middleware");
const operator = require("../operator/operator-router");
const server = express();
server.use(cors());
server.use(helmet());
server.use(logger());
server.use(express.json());

server.use("/api/restricted/operator", operator);
server.use("/api", authRouter);
// server.use("/api/restricted/operator", restrictedRoute(), dinersRouter);
server.get("/api/protected", restrictedRoute(), (req, res) => {
  res.status(200).json({ message: "Test -- Authorized" });
});

server.use(handleError());
server.get("/", (req, res) => {
  res.status(200).json({ message: "Server is Running." });
});

module.exports = server;
