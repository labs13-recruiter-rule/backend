// Import dependencies
const express = require('express');
const cors = require('cors');

// Import Routes
const usersRouter = require('./routes/usersRouter');

// Server invokation
const server = express();

// Server middleware
server.use(express.json());
server.use(cors());

// Route usage

server.use('/users', usersRouter);

server.get('/', (req, res) => {
  res.send(`<p>test, we're up and running! </p>`);
});

module.exports = server;
