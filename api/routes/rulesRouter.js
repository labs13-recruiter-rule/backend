const express = require('express');
const { Engine, Rule } = require('json-rules-engine');

// local imports
const { sendFunc } = require('./mailerFunc');
const userEngines = require('../models/engines-model');
const userEngineRules = require('../models/rules-model');
const { decodeHeader } = require('../utils/firebaseAuth');
const engineAuthMW = require('../utils/engineAuthMW');

// invokations and declarations

const router = express.Router({ mergeParams: true });
// this endpoint will look like /engines/engineID/rules

// this will be for CRUD operations for rules.
// maybe /rules/use or /engines/use route for specifically attempting to use the engine?

router.get('/', decodeHeader, engineAuthMW, async (req, res) => {
  // get all rules for engine.
  const { engineid } = req.params;
  console.log(engineid);
  try {
    const engineRules = await userEngineRules.getRulesByEngineId(engineid);

    if (engineRules.length > 0) {
      res.status(200).json(engineRules);
    } else {
      res.status(404).json({
        message:
          'Could not find any rules associated with this engine. Please ensure you have set up rules for this engine before trying again',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error retrieving engine rules', error });
  }
});

router.post('/', decodeHeader, engineAuthMW, async (req, res) => {
  // add rule to engine
  // COME BACK AND IMPLEMENT RULE JSON FEATURES
  const { engineid } = req.params;
  const rule = {
    ...req.body,
    user_id: req.headers.user.firebase_uuid,
    engine_id: engineid,
  };
  try {
    const addedRule = await userEngineRules.addRuletoEngine(engineid, rule);
    if (addedRule) {
      res.status(201).json(addedRule);
    } else {
      res
        .status(500)
        .json({ message: 'Your rule could not be saved to the engine.' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error adding rule to engine', error });
  }
});

router.get('/:ruleid', decodeHeader, async (req, res) => {
  const { engineid, ruleid } = req.params;

  try {
    const specificRule = await userEngineRules.getRuleByRuleId(
      engineid,
      ruleid,
    );
    if (specificRule) {
      res.status(200).json(specificRule);
    } else {
      res.status(404).json({
        message:
          'Could not find rule with specified ID. Please make sure the rule exists.',
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving specific engine rule', error });
  }
});

module.exports = router;
