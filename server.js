const express = require("express");
const cors = require("cors");

const authRouter = require("./auth/auth-router.js");
const usersRouter = require("./users/users-router.js");
const positionsRouter = require("./positions/positions-router.js");
const departmentsRouter = require("./departments/departments-router.js");

const server = express();

server.use(express.json());
server.use(cors());

// server.use("/auth", authRouter);
server.use("/users", usersRouter);
// server.use("/positions", positionsRouter);
// server.use("/departments", departmentsRouter);

server.get("/", (req, res) => {
  res.send("Root get is working");
});

module.exports = server;
