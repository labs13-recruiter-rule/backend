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
    res.status(500).json(err);
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
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  Users.addUser(req.body)
    .then(user => {
      res.status(200).json({
        message: `user was successfully added to database.`,
        id: user[0], // returns id on SQL table
      });
    })
    .catch(error => {
      if (error.code === 'SQLITE_CONSTRAINT') {
        return res.status(500).json({
          message: 'User is already in the database. Proceed like normal.', // This is like this because we'll have to make a POST request to our own DB when someone signs in with Firebase and we *want* it to fail if the person is already in the database.
        });
      }
      return res.status(500).json(error);
    });
});

router.put('/:id', async (req, res) => {
  Users.update(req.params.id, req.body)
    .then(user => {
      res.status(200).json({ message: 'Successfully updated!' });
    })
    .catch(error => {
      return res.status(500).json({
        error,
        message: 'There was an error updating the database',
      });
    });
});

router.delete('/:id', async (req, res) => {
  Users.deleteUser(req.params.id)
    .then(deleted => {
      return res.status(200).json({
        message: 'User was successfully deleted',
      });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get('/fbid/:firebase_uuid', async (req, res) => {
  Users.getUserIDByUUID(req.params.firebase_uuid)
    .then(user_id => {
      res.status(200).json(user_id);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
