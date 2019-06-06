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

router.get('/:contactid', async (req, res) => {
  //
  const { contactid } = req.params;

  try {
    const contact = await userContacts.getContactByContactID(contactid);

    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({
        message:
          'No contact with specified ID found. Please ensure you are searching for a valid contact.',
      });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.put('/:contactid', async (req, res) => {
  // Note: Add middleware to make sure only user who owns contact can add/delete/update/read their contacts
  const { contactid } = req.params;
  const { name, email } = req.body;

  if (name || email) {
    try {
      const newContact = await userContacts.updateContactByContactID(
        contactid,
        req.body,
      );

      if (!newContact) {
        res.status(404).json({
          message:
            'No contact with specified ID found. Please ensure you are searching for a valid contact.',
        });
      } else {
        const newContactInfo = await userContacts.getContactByContactID(
          contactid,
        );
        res.status(200).json(newContactInfo);
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  } else {
    res.status(500).json({
      message: 'You must provide information to update the contact with!',
    });
  }
});

module.exports = router;
