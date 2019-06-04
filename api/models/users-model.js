const db = require('../../data/dbConfig');

async function getUsers() {
  return db('users');
}

function getUsersById(id) {
  return db('users')
    .where({ id })
    .first();
}

function insert(user) {
  return db('users')
    .insert(user)
    .then(ids => ({ id: ids[0] }));
}

function update(id, user) {
  return db('users')
    .where('id', Number(id))
    .update(user);
}

function deleteUser(id) {
  return db('users')
    .where({ id })
    .del();
}

module.exports = {
  getUsers,
  getUsersById,
  insert,
  update,
  deleteUser,
};
