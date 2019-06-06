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

async function updateContactByContactID(id, updatedContact) {
  try {
    const contactVerify = await getContactByContactID(id);

    if (contactVerify) {
      try {
        const contactChanges = await db('userContacts')
          .where({ id })
          .first()
          .update(updatedContact);

        return contactChanges;
      } catch (err) {
        console.log(err);
      }
    } else {
      return false;
    }
  } catch (error) {}
}

module.exports = {
  getContactsByUser,
  getContactByContactID,
  addContactToUserContacts,
  updateContactByContactID,
};
