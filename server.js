const express = require("express");

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
	res.send(`<p>test, we good </p>`);
});

module.exports = server;
