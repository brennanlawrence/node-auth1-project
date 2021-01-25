const express = require("express");
const server = express();
const usersRoute = require("./users/users-router");

server.use(express.json());

server.use("/api", usersRoute);


server.get("/", (req, res) => {
  res.json({ api: "up", enviroment: process.env.NODE_ENV });
});

module.exports = server;