const express = require('express');
const { Engine } = require('json-rules-engine');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.senderEMAIL,
    pass: process.env.senderPASSWORD,
  },
});

const router = express.Router();

const receivers = 'omaro@me.com';
const mailOptions = {
  from: 'recruiterrule@gmail.com',
  to: receivers,
  subject: 'dont want this email again v1',
  text: 'That was easy!',
};

router.post('/', (req, res) => {
  const engine = new Engine();

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
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              res.status(500).json({ message: 'email error', error });
            } else {
              res.status(200).json({ message: 'we good' });
            }
          }),
      },
    },
  };

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
      events.map(event => event.params.sendFunc());
    })
    .catch(err => res.status(500).json({ message: 'were not good', err }));
});

module.exports = router;
