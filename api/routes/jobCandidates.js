const router = require('express').Router();

const Candidates = require('../models/jobCandidates')
const asyncHandler = require('../helpers/asyncHandler')

router.get('/', (req, res) => {
  Candidates.find()
    .then(Candidates => {
      res.status(200).json(Candidates);
    })
    .catch(error => {
      res
        .status(500)
        .json(error);
    });
});

const getCandidate = async (req, res) => {
    const result = await Candidates.findById(req.params.id)
    if (result) {
        res.status(200).json(result);
    } else {
        res.status(404).json({ message: 'We could not find the candidate' });
    }
}

const postCandidate = async (req, res) => {
    const result = req.body;

    if (result.name) {
      try {
        const inserted = await Candidates.add(result);
        res.status(201).json(inserted);
      } catch (error) {
        res
          .status(500)
          .json({ message: 'Fail to add the new candidate' });
      }
    } else {
      res.status(400).json({ message: 'Please provide name of the candidate' });
    }
}

const putCandidate = async (req, res) => {
    const changes = req.body;
    const updated = await Candidates.update(req.params.id, changes);
    if (updated) {
      res.status(200).json(updated);
    } else {
      res.status(404).json({
        message: 'That result does not exist',
      });
    }
}


const deleteCandidate = async (req, res) => {
    const count = await Candidates.remove(req.params.id);
    if (count > 0) {
        res.status(204).end();
    } else {
        res.status(404).json({
            message: 'That result does not exist, perhaps it was deleted already',
        });
    }
}


router.get('/:id', asyncHandler(async (req, res) => getCandidate(req, res)))
router.post('/', asyncHandler(async (req, res) => postCandidate(req, res)));
router.put('/:id', asyncHandler(async (req, res) => putCandidate(req, res)));
router.delete('/:id', asyncHandler(async (req, res) => deleteCandidate(req, res)));


module.exports = router;
