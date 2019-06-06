const express = require('express');
const Users = require('../models/users-model');
const { decodeHeader, decodeBody } = require('../utils/firebaseAuth');

const router = express.Router();

router.post('/register', decodeBody, async (req, res) => {
  //
  const newUser = req.body;

  try {
    const addNewUser = await Users.addUser(newUser);
    res.status(200).json({
      message: `user was successfully added to database.`,
      id: addNewUser[0], // returns id on SQL table
    });
  } catch (err) {
    console.log(err);
    // come back and set error res
  }
});

router.post('/login', decodeBody, async (req, res) => {
  const userLoggingIn = req.body;

  try {
    const userLoggedIn = await Users.getUserIDByUUID(userLoggingIn.uid);

    res.status(200).json(userLoggedIn);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
