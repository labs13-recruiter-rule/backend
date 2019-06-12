const db = require('../../data/dbConfig');

async function getEngines() {
  return db('engines');
}

function getEnginesById(id) {
  return db('engines')
    // .first()
    .join('rules_headshot', 'rules_headshot.engine_id', 'engines.id')
    .join('roles', 'rules_headshot.send_to', 'roles.id')
    .where('engines.id', id)

    //   .join('roles', 'rules_headshot.send_to', 'roles.id')

}

// function getUserIDByUUID(uuid) {
//   return db('users')
//     .where({ firebase_uuid: uuid })
//     .select('id');
// }

// async function addEngines(user) {
//   return db('users').insert(user, 'id');
// }

// function update(id, user) {
//   return db('users')
//     .where('id', Number(id))
//     .update(user);
// }

// function deleteUser(id) {
//   return db('users')
//     .where({ id })
//     .del();
// }

module.exports = {
  getEngines,
  getEnginesById,
//   addUser,
//   update,
//   deleteUser,
//   getUserIDByUUID,
};
