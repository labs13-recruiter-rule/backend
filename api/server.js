// Import dependencies
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// Import Routes
const usersRouter = require('./routes/usersRouter');
const userContactsRouter = require('./routes/userContacts-router');
const authRouter = require('./routes/registerRouter');
const candidatesRouter = require('./routes/candidatesRouter');
const mailerRouter = require('./routes/mailer');
const engineRouter = require('./routes/engineRouter');
const enginesRouter = require('./routes/enginesRouter');
const emailhistoryRouter = require('./routes/emailhistoryRouter');
const addresseetypesRouter = require('./routes/addresseetypesRouter');
const addresseeContactsRouter = require('./routes/addresseeContactsRouter');

// Server invocation
const server = express();

// Server middleware
server.use(express.json());
server.use(cors());
server.use(helmet());

// Route usage

server.use('/engine', engineRouter);
server.use('/engines', enginesRouter);
server.use('/users', usersRouter); // users
server.use('/users/:userid/contacts', userContactsRouter); // contacts for each user
server.use('/auth', authRouter); // authentication
server.use('/candidates', candidatesRouter); // candidates
server.use('/mailer', mailerRouter); // sending emails
server.use('/emailhistory', emailhistoryRouter); // email history
server.use('/groups', addresseetypesRouter); // addressee types, eg manager
server.use('/groupcontacts', addresseeContactsRouter); // addressee_type contacts, eg individual people to classify as manager

// Sanity Check
server.get('/', (req, res) => {
  res.send(`<p>test, we're up and running! </p>`);
});

module.exports = server;
