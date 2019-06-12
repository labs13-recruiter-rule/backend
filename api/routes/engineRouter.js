const express = require('express');
const { Engine, Rule } = require('json-rules-engine');
const nodemailer = require('nodemailer');
const { sendFunc } = require('./mailerFunc');
const userEngines = require('../models/engines-model');

const router = express.Router();

router.post('/', (req, res) => {
  const engine = new Engine();

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
        sendFunc: () =>
          // transporter.sendMail(mailOptions('test'), (error, info) => {
          //   if (error) {
          //     res.status(500).json({ message: 'email error', error });
          //   } else {
          //     res.status(200).json({ message: 'we good' });
          //   }
          // }),
          sendFunc('omaro@me.com', 'joe'),
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
  // console.log(jsCand, 'rule jsCand');
  // engine.addRule(jsCandidateRule);

  engine.addRule(jsCandidateRule);

  const facts = req.body;

  engine
    .on('success', (event, almanac) => {
      console.log('has all of the skills');
    })
    .on('failure', event => {
      console.log('did not have all of the skills');
    });

  engine
    .run(facts)
    .then(function(events) {
      console.log('good, sent');
      events.map(event => event.params.sendFunc());
    })
    .catch(err => res.status(500).json({ message: 'were not good', err }));
});

router.post('/addRule', async (req, res) => {
  // Endpoint for adding rules to a user's rules list/DB
});

module.exports = router;
