const express = require('express');
const { Engine, Rule } = require('json-rules-engine');

// local imports
const { sendFunc } = require('./mailerFunc');
const userEngines = require('../models/engines-model');
const userEngineRules = require('../models/rules-model');
const { decodeHeader } = require('../utils/firebaseAuth');
const engineAuthMW = require('../utils/engineAuthMW');

// invoke
const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
  const { engineid } = req.params;
  res.status(200).json({ message: engineid });
});

// get rules and run candidate through. POST method

router.post('/', decodeHeader, engineAuthMW, async (req, res) => {
  //
  const { engineid } = req.params;
  const candidate = req.body;
  const engine = new Engine([], { allowUndefinedFacts: true });

  try {
    const engineRules = await userEngineRules.getRulesByEngineId(engineid);

    if (engineRules.length > 0) {
      // if the engine has rules, continue to running candidate through the engine

      // Will be getting back multiple rules, so we must map over.
      // But, if it's only one, we can't map over. So.
      if (engineRules.length > 1) {
        // map
        engineRules.map(rule => {
          if (rule.rule) {
            // console.log('from rr', rule.rule); // test works. only rules that aren't rull get logged
            const ruleToUse = new Rule(rule.rule);
            console.log('from new', ruleToUse);
            engine.addRule(ruleToUse);
          }
        });

        // so, rules should have been added in the function above. now invoke engine run here?
        engine
          .run(candidate)
          .then(function(events) {
            events.map(event => {
              if (event.type === 'email') {
                console.log('if statement in engine event');
                sendFunc(event.params.contact, candidate, req);
              }
            });
          })
          .catch(err => {
            console.log('engine had an error', err);
          });
        // / Nah. gotta move this out of the if block and into the scope above it. easy fix.
      } else if (engineRules.length === 1) {
        // use rule
        console.log('only 1 rule');
      }

      res.status(200).json(engineRules.rule);
    } else {
      res.status(404).json({
        message:
          'Could not find rules associated with engine. Please ensure rules exist before trying to run a candidate through the engine.',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error retrieving engine rules', error });
  }
});

module.exports = router;
