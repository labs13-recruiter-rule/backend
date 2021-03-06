const db = require('../../data/dbConfig');

function getContactsByUser(uuid) {
  return db('userContacts').where({ user_id: uuid });
}

function getContactByContactID(id) {
  return db('userContacts')
    .where({ id })
    .first();
}

async function addContactToUserContacts(uuid, contact) {
  contact = {
    ...contact,
    user_id: uuid,
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
  } catch (error) {
    console.log(error);
  }
}

async function deleteContactByContactID(id) {
  try {
    const contactVerify = await getContactByContactID(id);

    if (contactVerify) {
      try {
        const deletedContact = await db('userContacts')
          .where({ id })
          .first()
          .del();

        return deletedContact;
      } catch (err) {
        console.log(err);
      }
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getContactsByUser,
  getContactByContactID,
  addContactToUserContacts,
  updateContactByContactID,
  deleteContactByContactID,
};
