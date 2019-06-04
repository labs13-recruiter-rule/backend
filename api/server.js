// Import dependencies
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// Import Routes
const usersRouter = require('./routes/usersRouter');
const jobCandidates = require('./routes/jobCandidates');
const reviewsRouter = require('./routes/reviewsRouter');

// Server invokation
const server = express();

// Server middleware
server.use(express.json());
server.use(cors());
server.use(helmet());

// Route usage

server.use('/users', usersRouter);
server.use('/candidates', jobCandidates);
server.use('/reviews', reviewsRouter);

server.get('/', (req, res) => {
  res.send(`<p>test, we're up and running! </p>`);
});

module.exports = server;
