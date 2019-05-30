// Import dependencies
const express = require("express");
const cors = require("cors");

// Server invokation
const server = express();

// Server middleware
server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
	res.send(`<p>test, we're up and running! </p>`);
});

module.exports = server;
