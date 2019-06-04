const router = require('express').Router();

const Companies = require('../models/companies-model');
const asyncHandler = require('../helpers/asyncHandler');

router.get('/', async (req, res) => {
  try {
    const users = await Companies.getCompanies();
    if (users.length > 0) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: 'No companies found in the database' });
    }
  } catch (err) {
    res.status(500).json(error);
  }
});

module.exports = router;
