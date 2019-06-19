const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.API_KEY);

router.use(bodyParser.text());

router.post('/', async (req, res) => {
  try {
    const { status } = await stripe.charges.create({
      amount: 2000,
      currency: 'usd',
      description: 'An example charge',
      source: req.body,
    });

    res.json({ status });
  } catch (err) {
    res.status(500).end();
  }
});

module.exports = router;
