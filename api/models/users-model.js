const db = require('../../data/dbConfig');

async function getUsers() {
  return db('users');
}

function getUsersById(id) {
  return db('users')
    .where({ id })
    .first();
}

module.exports = {
  getUsers,
  getUsersById,
};
