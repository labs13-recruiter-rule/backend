const express = require('express');

const router = express.Router();

const Engines = require('../models/engines-model');



router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const engines = await Engines.getEnginesById(id);
    if (engines) {
      res.status(200).json(engines);
    } else {
      res.status(404).json({ message: 'No engine found with that ID' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;