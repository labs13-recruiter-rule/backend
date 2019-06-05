const db = require('../../data/dbConfig');

function getContactsByUser(id) {
  return db('userContacts').where({ userContactBelongsTo: id });
}

function getContactByContactID(id) {
  return db('userContacts')
    .where({ id })
    .first();
}

async function addContactToUserContacts(id, contact) {
  contact = {
    ...contact,
    userContactBelongsTo: id,
  };

  const [newContactID] = await db('userContacts').insert(contact, 'id');
  const newContact = await getContactByContactID(newContactID);

  return newContact;
}

module.exports = {
  getContactsByUser,
  getContactByContactID,
  addContactToUserContacts,
};
