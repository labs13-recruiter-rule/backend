const express = require('express');
const { Engine, Rule } = require('json-rules-engine');

// local imports
const { sendFunc } = require('./mailerFunc');
const userEngines = require('../models/engines-model');
const { decodeHeader } = require('../utils/firebaseAuth');
const engineAuthMW = require('../utils/engineAuthMW');

const router = express.Router();

// ***** START rule engine implementation playground ***** //

router.post('/noUse', (req, res) => {
  const engine = new Engine();
  const { candidate } = req.body;
  // const mailOptions = canSend => {
  //   return {
  //     from: 'recruiterrule@gmail.com',
  //     to: receivers,
  //     subject: 'want this email again v1',
  //     text: canSend,
  //   };
  // };
  const jsCandidateRule = {
    conditions: {
      all: [
        {
          fact: 'skill',
          operator: 'equal',
          value: 'React',
        },
        {
          fact: 'hasHeadshot',
          operator: 'equal',
          value: true,
        },
      ],
    },
    event: {
      type: 'send-to-omar-email',
      params: {
        sendFunc: (r, c) =>
          // transporter.sendMail(mailOptions('test'), (error, info) => {
          //   if (error) {
          //     res.status(500).json({ message: 'email error', error });
          //   } else {
          //     res.status(200).json({ message: 'we good' });
          //   }
          // }),
          {
            sendFunc('omaro@me.com', c);
            // console.log('from c', c);
          },
      },
    },
  };

  // const jsCand = new Rule(jsCandidateRule);
  // console.log(jsCanJSON);
  // console.log('from jsCand', jsCand);

  // const jsCandString = jsCand.toJSON();
  // console.log(jsCandString);
  // const restoredRule = new Rule(jsCandString);
  // console.log(restoredRule, 'rule restored');
  console.log(jsCandidateRule, 'rule jsCand');
  // engine.addRule(jsCandidateRule);

  engine.addRule(jsCandidateRule);

  engine
    .on('success', (event, almanac) => {
      console.log('has all of the skills');

      // event.params.sendFunc('r', almanac.factValue('*'));

      res.status(200).json({
        message:
          'Candidate met all expectations, passed the engine, and was emailed to the correct recepient.',
      });
    })
    .on('failure', event => {
      console.log('did not have all of the skills');
      res.status(203).json({
        message:
          'Candidate did not meet all expectations and was not emailed to anybody.',
      });
    });

  // engine.addFact('candidate-info', function(params, almanac) {
  //   return almanac.factValue('candidate').then(skill => {
  //     return skill;
  //   });
  // });

  engine
    .run(candidate)
    .then(function(events) {
      console.log('good, sent');

      events.map(event => event.params.sendFunc('r', candidate));
    })
    .catch(err => {
      // res.status(500).json({ message: 'were not good', err }));
      console.log(err);
    });
});

router.post('/addRule', decodeHeader, async (req, res) => {
  // Endpoint for adding rules to a user's rules list/DB

  const ruleReceived = req.body;

  const ruleToAdd = new Rule(ruleReceived);
  const ruleToAddJSON = ruleToAdd.toJSON();
  // console.log(ruleToAddJSON);

  const engine = {
    user_id: req.headers.user.firebase_uuid,
    rule: ruleToAddJSON,
  };
  try {
    const newEngineRule = await userEngines.addEngineToUser(engine);
    res.status(201).json({
      message: 'Your new engine was added succesfully!',
      newEngineRule,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error', error });
  }
});

router.get('/getRule/:id', decodeHeader, async (req, res) => {
  // remember to add in engineAuthMW so only engine creators can access their engines
  const { id } = req.params;

  try {
    const engineToReturn = await userEngines.getEnginesById(id);
    console.log(engineToReturn);
    res.status(200).json({ message: 'Engine found!', engineToReturn });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.post('/useRule/:id', decodeHeader, async (req, res) => {
  // remember to add in engineAuthMW so
  // only engine creators can access their engines
  const { id } = req.params;
  const { candidate } = req.body;

  try {
    const engineToReturnAndUse = await userEngines.getEnginesById(id);
    const engineToUse = engineToReturnAndUse.rule;

    if (engineToUse) {
      const engine = new Engine();

      const restoredRule = new Rule(engineToUse);
      console.log(restoredRule);
      engine.addRule(restoredRule);

      //
      engine
        .run(candidate)
        .then(function(events) {
          console.log('then event hit');

          events.map(event => {
            if (event.type === 'email') {
              console.log('if statement in event.type, hit');
              sendFunc(event.params.contact, candidate);
            }
          });
        })
        .catch(err => {
          console.log('eng catch no work', err);
        });
    } else {
      console.log('no engine found, rip');
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// ***** END rule engine implementation playground ***** //

router.get('/', decodeHeader, async (req, res) => {
  // get all engines for user logged in
  const { firebase_uuid } = req.headers.user;

  try {
    const engines = await userEngines.getEnginesByUUID(firebase_uuid);
    if (engines.length > 0) {
      res.status(200).json(engines);
    } else {
      res.status(404).json({
        message:
          'No engines found for this user. Please create an engine before trying again.',
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'DB Error retrieving engines', error });
  }
});

router.post('/', decodeHeader, async (req, res) => {
  // Endpoint for adding an engine to a user's engine list in DB

  const engineReceived = req.body;

  if (engineReceived.engine_name && engineReceived) {
    const engine = {
      // come back and replace vv below vv with spread operator once starting work with addressee types
      engine_name: engineReceived.engine_name,
      user_id: req.headers.user.firebase_uuid,
    };
    try {
      const newEngine = await userEngines.addEngineToUser(engine);
      res.status(201).json({
        message: 'Your new engine was added succesfully!',
        newEngine,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error', error });
    }
  } else {
    res.status(500).json({
      message: `There was an error saving your engine. Please ensure you provided a name for your engine.`,
    });
  }
});

router.get('/:engineid', decodeHeader, engineAuthMW, async (req, res) => {
  //
  const { engineid } = req.params;
  try {
    const specificEngine = await userEngines.getEnginesById(engineid);
    if (specificEngine) {
      res.status(200).json(specificEngine);
    } else {
      res.status(404).json({
        message:
          'Could not find an engine with that ID. Please ensure the engine you are attempting to access exists.',
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: 'Error attemtping to access engine', error });
  }
});

router.put('/:engineid', decodeHeader, engineAuthMW, async (req, res) => {
  const { engineid } = req.params;
  const engineModifications = req.body;

  try {
    const modifyEngine = await userEngines.modifyUserEngine(
      engineid,
      engineModifications,
    );

    if (!modifyEngine) {
      res.status(404).json({
        message:
          'There was an error updating your engine. Please ensure you are trying to update an existing engine.',
      });
    } else {
      try {
        const modifiedEngineResult = await userEngines.getEnginesById(engineid);
        res.status(200).json({
          message: 'You have succesfully updated your engine!',
          modifiedEngineResult,
        });
      } catch (err) {
        console.log(err);
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating engine', error });
  }
});

router.delete('/:engineid', decodeHeader, engineAuthMW, async (req, res) => {
  const { engineid } = req.params;
  try {
    const engineToDelete = await userEngines.deleteUserEngine(engineid);
    if (!engineToDelete) {
      res.status(404).json({
        message:
          'There was an error deleting your engine. Please ensure the engine you are attempting to delete is an existing engine before trying again.',
      });
    } else {
      res
        .status(200)
        .json({ message: 'You have succesfully deleted your engine' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting your engine', error });
  }
});

module.exports = router;
