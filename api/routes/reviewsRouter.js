const router = require('express').Router();

const reviewsModel = require('../models/reviewsModel');

/* const asyncHandler = require('../helpers/asyncHandler'); */

router.get('/', async (req, res) => {
  try {
    const reviews = await reviewsModel.getreviews();
    if (reviews.length > 0) {
      res.status(200).json(reviews);
    } else {
      res.status(404).json({ message: 'No companies found in the database' });
    }
  } catch (err) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const reviews = await reviewsModel.getCompanyById(id);
    if (reviews) {
      res.status(200).json(reviews);
    } else {
      res.status(404).json({ message: `Company id: ${id} does not exist` });
    }
  } catch (err) {
    res.status(500).json(error);
  }
});

router.post('/', (req, res) => {
  const { name } = req.body;
  const message400 = {
    error: 'Please provide name for the company',
  };
  const message500 = {
    error: 'There was an error saving the company to the database',
  };

  if (name) {
    reviewsModel
      .addCompany(req.body)
      .then(reviews => {
        res.status(201).json(reviews);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(message500);
      });
  } else {
    res.status(400).json(message400);
  }
});

module.exports = router;
