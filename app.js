const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const weather = require("./weather.js");
const api = require("./api.js");

const port = process.env.PORT || 4001;
const hostname = "127.0.0.1";
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server); // < Interesting!

io.on("connection", socket => {
  console.log("New client connected"),
    setInterval(
      // () => api.getApiAndEmit(socket),
      // 10000
      () => api.fakeMethod(socket),
      5000
    );

  socket.on("disconnect", () => console.log("Client disconnected"));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
