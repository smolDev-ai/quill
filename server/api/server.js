const express = require('express');
const server = express();

const setup = require('../config/setup.js');
setup(server);

const defaultRoute = require("./routes/default");
server.use("/api/", defaultRoute)

server.get('/', (req, res) => {
    res.send({message: "Api Responding"})
})

module.exports = server;