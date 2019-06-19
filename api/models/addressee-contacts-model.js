const db = require('../../data/dbConfig');

async function getContactsByAddresseeId(addressee_id, uuid) {
  return db('addressee_contacts')
    .where({
      addressee_id,
      user_id: uuid,
    })
    .join(
      'addressee_contacts',
      'addressee_contacts.contact_id',
      '=',
      'userContacts.id',
    )
    .select('*');
}

async function getAddresseeTypeByContactId(contact_id, uuid) {
  return db('addressee_contacts')
    .where({
      contact_id,
      user_id: uuid,
    })
    .join(
      'addressee_types',
      'addressee_contacts.addressee_id',
      '=',
      'addressee_types.id',
    )
    .select('addressee_type');
}

async function getAddresseeContactById(addressee_contact_id, uuid) {
  return db('addressee_contacts')
    .where({ id: addressee_contact_id, user_id: uuid })
    .join(
      'addressee_contacts',
      'addressee_contacts.addressee_id',
      '=',
      'addressee_types.id',
    )
    .select('addressee_type')
    .join('addressee_contacts.contact_id', '=', 'userContacts.id')
    .select('*');
}

async function getAllAddresseeContacts(uuid) {
  return db('addressee_contacts')
    .where({ user_id: uuid })
    .join(
      'addressee_types',
      'addressee_contacts.addressee_id',
      '=',
      'addressee_types.id',
    )
    .select('addressee_type');
}

async function updateAddresseeContact(
  addressee_contact_id,
  uuid,
  updatedAddresseeContact,
) {
  return db('addressee_contacts')
    .where({
      id: addressee_contact_id,
      user_id: uuid,
    })
    .update(updatedAddresseeContact);
}

async function addAddresseeContact(uuid, newAddresseeContact) {
  const AddresseeContact = { ...newAddresseeContact, user_id: uuid };
  return db('addressee_contacts').insert(AddresseeContact, 'id');
}

async function deleteAddresseeContact(addressee_contact_id, uuid) {
  return db('addressee_contacts')
    .where({
      user_id: uuid,
      id: addressee_contact_id,
    })
    .del();
}

module.exports = {
  deleteAddresseeContact,
  addAddresseeContact,
  updateAddresseeContact,
  getAddresseeContactById,
  getAddresseeTypeByContactId,
  getAllAddresseeContacts,
  getContactsByAddresseeId,
};
