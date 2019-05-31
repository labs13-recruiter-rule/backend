const express = require('express');

const router = express.Router();

const Users = require('../models/users-model');

router.get('/', async (req, res) => {
  try {
    const users = await Users.getUsers();
    if (users.length > 0) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: 'No users found in the database' });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.getUsersById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'No user found with that ID' });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
