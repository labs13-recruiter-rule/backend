const express = require('express');
const { decodeHeader } = require('../utils/firebaseAuth');
const router = express.Router();
const emailHistory = require('../models/email-history-model');

// GET ALL EMAILS BY CANDIDATE_ID

router.get('/:candidate_id', decodeHeader, async (req, res) => {
  const uuid = req.headers.user.firebase_uuid;
  const { candidate_id } = req.params;
  emailHistory
    .getAllEmailsByCandidate(candidate_id, uuid)
    .then(emails => {
      res.status(200).json(emails);
    })
    .catch(error => {
      res.status(500).json({
        message: 'There was an error retrieving your email history.',
        error,
      });
    });
});

// GET ALL EMAILS BY CONTACT_ID

router.get('/:contact_id', decodeHeader, async (req, res) => {
  const uuid = req.headers.user.firebase_uuid;
  const { contact_id } = req.params;
  emailHistory
    .getAllEmailsByContact(contact_id, uuid)
    .then(emails => {
      res.status(200).json(emails);
    })
    .catch(error => {
      res.status(500).json({
        message: 'There was an error retrieving your email history.',
        error,
      });
    });
});

// GET ALL EMAILS BY USER_ID

router.get('/', decodeHeader, async (req, res) => {
  const uuid = req.headers.user.firebase_uuid;
  emailHistory
    .getAllEmailsByUserId(uuid)
    .then(emails => {
      res.status(200).json(emails);
    })
    .catch(error => {
      res.status(500).json({
        message: 'There was an error retrieving your email history.',
        error,
      });
    });
});

// GET EMAIL BY EMAIL ID

router.get('/:email_id', decodeHeader, async (req, res) => {
  const uuid = req.headers.user.firebase_uuid;
  const { email_id } = req.params;
  emailHistory
    .getByEmailId(email_id, uuid)
    .then(email => {
      res.status(200).json(email);
    })
    .catch(error => {
      res.status(500).json({
        message: 'There was an error retrieving your sent email.',
        error,
      });
    });
});

// ADD TO EMAIL HISTORY

router.post('/', decodeHeader, async (req, res) => {
  const uuid = req.headers.user.firebase_uuid;
  const newEmail = req.body;
  emailHistory
    .addToEmailHistory(uuid, newEmail)
    .then(email => {
      res.status(200).json({
        message: 'Your sent email was successfully added to the email history.',
        email,
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'There was an error retrieving your email history.',
        error,
      });
    });
});

// GET COUNT OF EMAILS BY CANDIDATE ID

router.get('/count/candidate/:candidate_id', decodeHeader, async (req, res) => {
  const uuid = req.headers.user.firebase_uuid;
  const { candidate_id } = req.params;
  emailHistory
    .countEmailsByCandidate(candidate_id, uuid)
    .then(count => {
      res.status(200).json({
        message: `${count} emails have been sent about the candidate matching that candidate id`,
        count,
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'There was an error',
        error,
      });
    });
});

router.get('/count/contact/:contact_id', decodeHeader, async (req, res) => {
  const uuid = req.headers.user.firebase_uuid;
  const { contact_id } = req.params;
  emailHistory
    .countEmailsByContact(contact_id, uuid)
    .then(count => {
      res.status(200).json({
        message: `${count} emails have been sent about to the contact matching that id`,
        count,
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'There was an error',
        error,
      });
    });
});

router.get('/emailtotal', decodeHeader, async (req, res) => {
  const uuid = req.headers.user.firebase_uuid;
  emailHistory
    .countTotalEmailsByUserId(uuid)
    .then(count => {
      res
        .status(200)
        .json({ message: `You have sent ${count} emails.`, count });
    })
    .catch(error => {
      res.status(500).json({
        message: 'There was an error',
        error,
      });
    });
});

module.exports = router;
