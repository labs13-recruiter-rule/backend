const express = require('express');
const { decodeHeader } = require('../utils/firebaseAuth');

const router = express.Router();

const Candidates = require('../models/candidates-model');

router.get('/', decodeHeader, async (req, res) => {
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

router.get('/:id', decodeHeader, async (req, res) => {
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

router.post('/', decodeHeader, async (req, res) => {
  /* Candidates.addCandidate(req.body).then(candidate => {
    res.status(201).json(candidate)}).catch(error => {
    return res.status(500).json(error);
  }); */

  const candidateToAdd = req.body;
  try {
    const newCandidate = await Candidates.addCandidate(candidateToAdd);
    res.status(201).json(newCandidate);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.put('/:id', decodeHeader, async (req, res) => {
  Candidates.updateCandidate(req.params.id, req.body)
    .then(candidate => {
      res.status(200).json({ message: 'Successfully updated!', candidate });
    })
    .catch(error => {
      return res.status(500).json({
        error,
        message: 'There was an error updating the database',
      });
    });
});

router.delete('/:id', decodeHeader, async (req, res) => {
  Candidates.deleteCandidate(req.params.id)
    .then(deleted => {
      return res.status(200).json({
        message: 'Candidate was successfully deleted',
        deleted,
      });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
