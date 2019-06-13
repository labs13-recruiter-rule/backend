const express = require('express');
const { Engine, Rule } = require('json-rules-engine');

// local imports
const { sendFunc } = require('./mailerFunc');
const userEngines = require('../models/engines-model');
const engineRules = require('../models/rules-model');
const { decodeHeader } = require('../utils/firebaseAuth');

// invokations and declarations

const router = express.Router({ mergeParams: true });
// this endpoint will look like /engines/engineID/rules

// this will be for CRUD operations for rules.
// maybe /rules/use or /engines/use route for specifically attempting to use the engine?

router.get('/', (req, res) => {
  // get all rules for engine.
  const { engineid } = req.params;
});

module.exports = router;
