// Import dependencies
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// Import Routes
const usersRouter = require('./routes/usersRouter');
const userContactsRouter = require('./routes/userContacts-router');
const candidatesRouter = require('./routes/candidatesRouter');
const mailerRouter = require('./routes/mailer');

// Server invokation
const server = express();

// Server middleware
server.use(express.json());
server.use(cors());
server.use(helmet());

// Route usage

server.use('/users', usersRouter);

server.use('/users/:userid/contacts', userContactsRouter);

server.use('/candidates', candidatesRouter);
server.use('/mailer', mailerRouter);

server.get('/', (req, res) => {
  res.send(`<p>test, we're up and running! </p>`);
});

module.exports = server;
