const db = require('../../data/dbConfig');

function getContactsByUser(id) {
  return db('userContacts').where({ id });
}

module.exports = {
  getContactsByUser,
};
