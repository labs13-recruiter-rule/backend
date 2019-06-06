const db = require('../../data/dbConfig');

function getCandidates() {
  return db('candidates');
}

function getCandidatesById(id) {
  return db('candidates')
    .where({ id })
    .first();
}

function addCandidate(candidate) {
  return db('candidates').insert(candidate, 'id');
}

function updateCandidate(id, candidate) {
  return db('candidates')
    .where({ 'id' })
    .first()
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
