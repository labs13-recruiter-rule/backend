const db = require('../../data/dbConfig');

async function getCandidates() {
  return db('candidates');
}

function getCandidatesById(id) {
  return db('candidates')
    .where({ id })
    .first();
}

async function addCandidate(candidate) {
  return db('candidates').insert(candidate, 'id');
}

function updateCandidate(id, candidate) {
  return db('candidates')
    .where('id', Number(id))
    .update(candidate);
}

function deleteCandidate(id) {
  return db('candidates')
    .where({ id })
    .del();
}

module.exports = {
  getCandidates,
  getCandidatesById,
  addCandidate,
  updateCandidate,
  deleteCandidate,
};
