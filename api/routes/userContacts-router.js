const express = require('express');
const userContacts = require('../models/userContacts-model');
const contactAuthMW = require('../utils/contactAuthMW');
const { decodeHeader } = require('../utils/firebaseAuth');

// mergeParams allows us to grab URL params from other/previously defined routes
const router = express.Router({ mergeParams: true });

// endpoint /users/:id/contacts returns all contacts belonging to that user
router.get('/', decodeHeader, async (req, res) => {
  const id = req.headers.user.firebase_uuid;
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

router.post('/', decodeHeader, async (req, res) => {
  const id = req.headers.user.firebase_uuid;
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

router.get('/:contactid', decodeHeader, contactAuthMW, async (req, res) => {
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

router.put('/:contactid', decodeHeader, contactAuthMW, async (req, res) => {
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

router.delete('/:contactid', decodeHeader, contactAuthMW, async (req, res) => {
  const { contactid } = req.params;

  try {
    const deletedContact = await userContacts.deleteContactByContactID(
      contactid,
    );

    if (!deletedContact) {
      res.status(404).json({
        message:
          'No contact with specified ID found. Please ensure you are searching for a valid contact.',
      });
    } else {
      const newContactsList = await userContacts.getContactsByUser(
        req.headers.user.firebase_uuid,
      );

      res.status(200).json(newContactsList);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

module.exports = router;
