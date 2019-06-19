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
const rulesRouter = require('./routes/rulesRouter');
const emailhistoryRouter = require('./routes/emailhistoryRouter');
const addresseetypesRouter = require('./routes/addresseetypesRouter');
const addresseeContactsRouter = require('./routes/addresseeContactsRouter');
const enginesUseRouter = require('./routes/enginesUseRouter');
const stripeRouter = require('./routes/stripeRouter');

// Server invocation
const server = express();

// Server middleware
server.use(express.json());
server.use(cors());
server.use(helmet());

// ** Route usage **

// Engine
server.use('/engines', engineRouter); // engines belonging to users
server.use('/engines/:engineid/rules', rulesRouter); // rules associated with engines
server.use('/engines/:engineid/use', enginesUseRouter); // endpoint to run candidates through engines
// User
server.use('/users', usersRouter); // users
server.use('/contacts', userContactsRouter); // contacts for each user
server.use('/auth', authRouter); // authentication
// User extras
server.use('/candidates', candidatesRouter); // candidates
server.use('/mailer', mailerRouter); // sending emails
server.use('/emailhistory', emailhistoryRouter); // email history
server.use('/groups', addresseetypesRouter); // addressee types, eg manager
server.use('/groupcontacts', addresseeContactsRouter); // addressee_type contacts, eg individual people to classify as manager
server.use('/charge', stripeRouter); // checkout route
// Sanity Check
server.get('/', (req, res) => {
  res.send(`<p>test, we're up and running! </p>`);
});

module.exports = server;
