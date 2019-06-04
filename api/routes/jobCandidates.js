const router = require('express').Router();

const Candidates = require('../models/jobCandidates')
const asyncHandler = cb => {
    return async(req, res, next) => {
        try {
            cb(req, res)
        } catch (error) {
            res
            .status(500)
            .json(error);
        }
    }
}

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

router.get('/:id', asyncHandler(async (req, res) => {
    const result = await Candidates.findById(req.params.id);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'We could not find the candidate' });
        }
    })
);

router.post('/', async (req, res) => {
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
});

router.put('/:id', async (req, res) => {
  const changes = req.body;

  if (changes.name) {
    try {
      const updated = await Candidates.update(req.params.id, changes);
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({
          message: 'That result does not exist',
        });
      }
    } catch (error) {
      res
        .status(500)
        .json(error);
    }
  } else {
    res.status(400).json({
      message: 'Please provide the name of the candidate',
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const count = await Candidates.remove(req.params.id);
    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({
        message: 'That result does not exist, perhaps it was deleted already',
      });
    }
  } catch (error) {
    res
      .status(500)
      .json(error);
  }
});

module.exports = router;
