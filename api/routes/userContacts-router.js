const express = require('express');
const userContacts = require('../models/userContacts-model');

// mergeParams allows us to grab URL params from other/previously defined routes
const router = express.Router({ mergeParams: true });

// endpoint /users/:id/contacts returns all contacts belonging to that user
router.get('/', async (req, res) => {
  const id = req.params.userid;
  console.log(id);
  try {
    const contacts = await userContacts.getContactsByUser(id);

    if (contacts.length > 0) {
      res.status(200).json(contacts);
    } else {
      res.status(404).json({
        message:
          'No contacts found. Please add some contacts before checking again!',
      });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.post('/', async (req, res) => {
  const id = req.params.userid;
  const { name, email } = req.body;

  if (name && email) {
    try {
      const newContact = await userContacts.addContactToUserContacts(
        id,
        req.body,
      );

      res.status(201).json(newContact);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } else {
    res.status(500).json({
      message: 'You must provide both a name and an email for a contact.',
    });
  }
});

module.exports = router;
