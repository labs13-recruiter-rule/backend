const db = require('../../data/dbConfig');

function getContactsByUser(firebase_uuid) {
  const id = firebase_uuid;

  return db('userContacts').where({ userContactBelongsTo: id });
}

module.exports = {
  getContactsByUser,
};
