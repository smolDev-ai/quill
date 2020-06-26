const express = require('express');
const server = express();

const setup = require('../config/setup.js');
setup(server);

server.get('/', (req, res) => {
    res.send({message: "Api Responding"})
})

module.exports = server;