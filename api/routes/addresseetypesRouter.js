const express = require('express');
const { decodeHeader } = require('../utils/firebaseAuth');

const router = express.Router();
const addresseeTypes = require('../models/addressee-types-model');

// GET ALL ADDRESSEE_TYPES BY USER_ID

router.get('/', decodeHeader, async (req, res) => {
  const uuid = req.headers.user.firebase_uuid;
  addresseeTypes
    .getAddresseeTypes(uuid)
    .then(addressee_types => {
      if (addressee_types.length > 0) {
        res.status(200).json(addressee_types);
      } else {
        res.status(404).json({
          message:
            'No contact groups found. Please add some before checking again.',
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'There has been an error',
        error,
      });
    });
});

// GET ADDRESSEE_TYPE BY ADDRESSSEE ID

router.get('/:addressee_id', decodeHeader, async (req, res) => {
  const uuid = req.headers.user.firebase_uuid;
  const { addressee_id } = req.params;
  addresseeTypes
    .getAddresseeTypeById(addressee_id, uuid)
    .then(addressee_type => {
      if (addressee_type) {
        res.status(200).json(addressee_type);
      } else {
        res
          .status(404)
          .json({ message: 'Sorry, the contact group was not found.' });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Sorry, there was an error processing your request.',
        error,
      });
    });
});

// POST ADDRESSEE TYPE

router.post('/', decodeHeader, async (req, res) => {
  const uuid = req.headers.user.firebase_uuid;
  addresseeTypes
    .addAddresseeType(req.body, uuid)
    .then(newAddresseeType => {
      res.status(201).json(newAddresseeType);
    })
    .catch(error => {
      res.status(500).json({
        message: 'There was an error creating your contact group.',
        error,
      });
    });
});

// PUT ADDRESSEE TYPE

router.put('/:addressee_id', decodeHeader, async (req, res) => {
  const uuid = req.headers.user.firebase_uuid;
  const { addressee_id } = req.params;
  const updatedAddressee_type = req.body;
  addresseeTypes
    .updateAddresseeType(addressee_id, uuid, updatedAddressee_type)
    .then(updatedAddresseeType => {
      res.status(200).json({
        message: 'Contact group successfully updated.',
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'There was an error updating your contact group',
        error,
      });
    });
});

// DELETE ADDRESSEE TYPE

router.delete('/:addressee_id', decodeHeader, async (req, res) => {
  const uuid = req.headers.user.firebase_uuid;
  const { addressee_id } = req.params;
  addresseeTypes
    .deleteAddresseeType(addressee_id, uuid)
    .then(deletedAddresseeType => {
      res.status(200).json({
        message: 'Contact Group successfully deleted.',
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'There was an error deleting your contact group.',
        error,
      });
    });
});

module.exports = router;
