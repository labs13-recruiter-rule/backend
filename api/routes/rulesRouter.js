const express = require('express');
const { Engine, Rule } = require('json-rules-engine');

// local imports
const { sendFunc } = require('./mailerFunc');
const userEngines = require('../models/engines-model');
const { decodeHeader } = require('../utils/firebaseAuth');

// invokations and declarations

const router = express.Router();

// this endpoint will look like /engines/engineID/rules

router.get('/', (req, res) => {
  // get all rules for engine.
});

module.exports = router;
