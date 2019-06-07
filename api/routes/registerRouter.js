const express = require('express');
const Users = require('../models/users-model');
const { decodeHeader, decodeBody } = require('../utils/firebaseAuth');

const router = express.Router();

router.post('/register', decodeBody, async (req, res) => {
  const { user } = req.body;
  console.log('from newUser, body', user);
  try {
    const addNewUser = await Users.addUser(user);
    console.log('from addNewUser', addNewUser);
    res.status(200).json({
      message: `user was successfully added to database.`,
      id: addNewUser[0], // returns id on SQL table
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

router.post('/login', decodeBody, async (req, res) => {
  const { user } = req.body;

  try {
    const userLoggedIn = await Users.getUserIDByUUID(user.firebase_uuid);

    res.status(200).json(userLoggedIn);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

module.exports = router;
