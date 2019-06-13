const express = require('express');
const { Engine, Rule } = require('json-rules-engine');

// local imports
const { sendFunc } = require('./mailerFunc');
const userEngines = require('../models/engines-model');
const { decodeHeader } = require('../utils/firebaseAuth');

const router = express.Router();

router.post('/', (req, res) => {
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

module.exports = router;
