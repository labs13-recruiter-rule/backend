const express = require("express");

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
	res.send(`<p>test, we're up and running! </p>`);
});

module.exports = server;
