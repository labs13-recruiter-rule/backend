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
  const specificRule = new Rule(req.body.rule);
  const specificRuleJSON = specificRule.toJSON();
  const rule = {
    user_id: req.headers.user.firebase_uuid,
    engine_id: engineid,
    rule: specificRuleJSON,
    addressee_id: req.body.addressee_id,
  };
  console.log('from reqbodyrule', req.body.rule);
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

router.put('/:ruleid', decodeHeader, engineAuthMW, async (req, res) => {
  const { engineid, ruleid } = req.params;
  const ruleModifications = req.body;
  // COME BACK AND IMPLEMENT RULE JSON FEATURES
  try {
    const modifyRule = await userEngineRules.modifyEngineRule(
      engineid,
      ruleid,
      ruleModifications,
    );

    if (!modifyRule) {
      res.status(404).json({
        message:
          'There was an error updating your rule. Please ensure you are trying to update an existing rule on an existing engine.',
      });
    } else {
      try {
        const modifiedRuleResult = await userEngineRules.getRuleByRuleId(
          engineid,
          ruleid,
        );
        res.status(200).json({
          message: 'You have succesfully updated your rule!',
          modifiedRuleResult,
        });
      } catch (err) {
        console.log(err);
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating rule', error });
  }
});

// COME BACK AND IMPLEMENT RULE JSON FEATURES
// COME BACK AND IMPLEMENT RULE JSON FEATURES
// COME BACK AND IMPLEMENT RULE JSON FEATURES

router.delete('/:ruleid', decodeHeader, engineAuthMW, async (req, res) => {
  //
  const { engineid, ruleid } = req.params;
  try {
    const ruleToDelete = await userEngineRules.deleteEngineRule(
      engineid,
      ruleid,
    );
    if (!ruleToDelete) {
      res.status(404).json({
        message:
          'There was an error deleting your rule. Please ensure the rule you are attempting to delete is an existing rule on an existing engine before trying again.',
      });
    } else {
      res
        .status(200)
        .json({ message: 'You have succesfully deleted your rule' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting your rule', error });
  }
});
module.exports = router;
