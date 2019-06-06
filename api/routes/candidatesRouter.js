const express = require('express');

const router = express.Router();

const Candidates = require('../models/candidates-model');

router.get('/', async (req, res) => {
  try {
    const candidates = await Candidates.getCandidates();
    if (candidates.length > 0) {
      res.status(200).json(candidates);
    } else {
      res.status(404).json({ message: 'No candidates found in the database' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const candidate = await Candidates.getCandidatesById(id);
    if (candidate) {
      res.status(200).json(candidate);
    } else {
      res.status(404).json({ message: 'No candidate found with that ID' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  Candidates.addCandidate(req.body)
    .then(candidate => {
      res.status(200).json({
        message: `Candidate was successfully added to database.`,
        id: candidate[0],
      });
    })
    .catch(error => {
      if (error.code === 'SQLITE_CONSTRAINT') {
        return res.status(500).json({
          message: 'Candidate is already in the database. Proceed like normal.',
        });
      }
      return res.status(500).json(error);
    });
});

router.put('/:id', async (req, res) => {
  Candidates.updateCandidate(req.params.id, req.body)
    .then(candidate => {
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
  Candidates.deleteCandidate(req.params.id)
    .then(deleted => {
      return res.status(200).json({
        message: 'Candidate was successfully deleted',
      });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
