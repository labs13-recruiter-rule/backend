const express = require('express');
const userContacts = require('../models/userContacts-model');

const router = express.Router({ mergeParams: true });

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
  } catch (error) {}
});

module.exports = router;
