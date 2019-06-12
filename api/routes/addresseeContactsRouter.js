const express = require('express');

const router = express.Router();
const addresseeContacts = require('../models/addressee-contacts-model');

// GET ALL CONTACTS BY ADDRESSEE_ID -- all contacts belonging to a certain addressee type

router.get('/:addressee_id', decodeHeader, async (req, res) => {
  const uuid = req.headers.user.firebase_uuid;
  const { addressee_id } = req.params;
  addresseeContacts
    .getContactsByAddresseeId(addressee_id, uuid)
    .then(addressee_contacts => {
      res.status(200).json(addressee_contacts);
    })
    .catch(error => {
      res.status(500).json({ message: 'There was an error', error });
    });
});

// GET ADDRESSEE_TYPE BY CONTACT_ID

router.get('/:contact_id', decodeHeader, async (req, res) => {
  const uuid = req.headers.user.firebase_uuid;
  const { contact_id } = req.params;
  addresseeContacts
    .getAddresseeTypeByContactId(contact_id, uuid)
    .then(addressee_contacts => {
      res.status(200).json(addressee_contacts);
    })
    .catch(error => {
      res.status(500).json({ message: 'There was an error', error });
    });
});

// GET ADDRESSEE_CONTACT BY ID

router.get('/:addressee_contact_id', decodeHeader, async (req, res) => {
  const uuid = req.headers.user.firebase_uuid;
  const { addressee_contact_id } = req.params;
  addresseeContacts
    .getAddresseeContactById(addressee_contact_id, uuid)
    .then(addressee_contact => {
      res.status(200).json(addressee_contact);
    })
    .catch(error => {
      res.status(500).json({ message: 'There was an error', error });
    });
});

// GET ALL ADDRESSEE CONTACTS BY USER ID

router.get('/', decodeHeader, async (req, res) => {
  const uuid = req.headers.user.firebase_uuid;
  addresseeContacts
    .getAllAddresseeContacts(uuid)
    .then(addressee_contacts => {
      res.status(200).json(addressee_contacts);
    })
    .catch(error => {
      res.status(500).json({ message: 'There was an error', error });
    });
});

// UPDATE ADDRESSEE CONTACT

router.put('/:addressee_contact_id', decodeHeader, async (req, res) => {
  const uuid = req.headers.user.firebase_uuid;
  const { addressee_contact_id } = req.params;
  addresseeContacts
    .updateAddresseeContact(addressee_contact_id, uuid, req.body)
    .then(updated => {
      res.status(200).json({
        message: 'Successfully Updated!',
        updated,
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'We are sorry. There was an error.',
        error,
      });
    });
});

// ADD ADDRESSEE CONTACT

router.post('/', decodeHeader, async (req, res) => {
  const uuid = req.headers.user.firebase_uuid;
  const newAddresseeContact = req.body;
  addresseeContacts
    .addAddresseeContact(uuid, newAddresseeContact)
    .then(newContact => {
      res.status(200).json({
        message: 'Contact successfully added to contact group!',
        newContact,
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'There was an error adding your contact to a contact group.',
        error,
      });
    });
});

// DELETE ADDRESSEE CONTACT

router.delete('/:addressee_contact_id', decodeHeader, async (req, res) => {
  const uuid = req.headers.user.firebase_uuid;
  const { addressee_contact_id } = req.params;
  addresseeContacts
    .deleteAddresseeContact(addressee_contact_id, uuid)
    .then(deleted => {
      res.status(200).json({
        message:
          'Your contact was successfully removed from the contact group.',
        deleted,
      });
    })
    .catch(error => {
      res.status(500).json({
        message:
          'There was an error removing your contact from the contact group',
        error,
      });
    });
});

module.exports = router;
