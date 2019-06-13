const db = require('../../data/dbConfig');

// get all addressee types by user_id
async function getAddresseeTypes(uuid) {
  return db('addressee_types').where({ user_id: uuid });
}

async function getAddresseeTypeById(addressee_id, uuid) {
  return db('addressee_types').where({ id: addressee_id, user_id: uuid });
}

async function addAddresseeType(addressee_type, uuid) {
  const new_addressee_type = { ...addressee_type, user_id: uuid };
  return db('addressee_types').insert(new_addressee_type, 'id');
}

async function updateAddresseeType(addressee_id, uuid, updatedAddressee_type) {
  return db('addressee_types')
    .where({ id: addressee_id, user_id: uuid })
    .update(updatedAddressee_type);
}

async function deleteAddresseeType(addressee_id, uuid) {
  return db('addressee_types')
    .where({ id: addressee_id, user_id: uuid })
    .del();
}

module.exports = {
  getAddresseeTypeById,
  getAddresseeTypes,
  addAddresseeType,
  updateAddresseeType,
  deleteAddresseeType,
};
