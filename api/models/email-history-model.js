const db = require('../../data/dbConfig');

async function getAllEmailsByUserId(uuid) {
  return db('email_history')
    .where({
      user_id: uuid,
    })
    .join('email_history', 'email_history.contact_id', '=', 'userContacts.id')
    .select('*')
    .join('email_history', 'email_history.candidate_id', '=', 'candidates.id')
    .select('*');
}

async function getByEmailId(email_id, uuid) {
  return db('email_history')
    .where({
      id: email_id,
      user_id: uuid,
    })
    .join('email_history', 'email_history.contact_id', '=', 'userContacts.id')
    .select('*')
    .join('email_history', 'email_history.candidate_id', '=', 'candidates.id')
    .select('*');
}

async function getAllEmailsByCandidate(candidate_id, uuid) {
  return db('email_history')
    .where({
      user_id: uuid,
      candidate_id,
    })
    .join('email_history', 'email_history.contact_id', '=', 'userContacts.id')
    .select('*')
    .join('email_history', 'email_history.candidate_id', '=', 'candidates.id')
    .select('*');
}

async function getAllEmailsByContact(contact_id, uuid) {
  return db('email_history')
    .where({
      user_id: uuid,
      contact_id,
    })
    .join('email_history', 'email_history.contact_id', '=', 'userContacts.id')
    .select('*')
    .join('email_history', 'email_history.candidate_id', '=', 'candidates.id')
    .select('*');
}

async function addToEmailHistory(uuid, newEmail) {
  const newEmail = { ...newEmail, user_id: uuid };
  return db('email_history').insert(newEmail, 'id');
}

async function countEmailsByCandidate(candidate_id, uuid) {
  return db('email_history')
    .count('id')
    .where({
      user_id: uuid,
      candidate_id,
    });
}

async function countEmailsByContact(contact_id, uuid) {
  return db('email_history')
    .count('id')
    .where({
      user_id: uuid,
      contact_id,
    });
}

async function countTotalEmailsByUserId(uuid) {
  return db('email_history')
    .count('id')
    .where({
      user_id: uuid,
    });
}

module.exports = {
  countEmailsByCandidate,
  countEmailsByContact,
  countTotalEmailsByUserId,
  getAllEmailsByContact,
  getAllEmailsByUserId,
  getAllEmailsByCandidate,
  getByEmailId,
  addToEmailHistory,
};
