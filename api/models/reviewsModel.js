const db = require('../../data/dbConfig');

module.exports = {
  getreviews,
  addreviews,
  getreviewsById,
};

const findById = id =>
  db('reviews')
    .where({ id })
    .first();

async function getreviews() {
  return db('reviews');
}

async function getreviewsById(id) {
  return db('reviews')
    .where({ id })
    .first();
}

async function addreviews(reviews) {
  return db('reviews')
    .insert(reviews, 'id')
    .then(([id]) => findById(id));
}
