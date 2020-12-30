const express = require('express');
const server = express();

const setup = require('../config/setup.js');
setup(server);

const defaultRoute = require("./routes/default");
const userRoutes = require("./routes/authRoutes.js")
server.use("/api/", defaultRoute)
server.use("/user/", userRoutes)

server.get('/', (req, res) => {
    res.send({message: "Api Responding"})
})

module.exports = server;