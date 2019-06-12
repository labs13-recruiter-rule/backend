const db = require('../../data/dbConfig');

async function getEngines() {
  return db('rules');
}

function getEnginesById(id) {
  return db('rules')
    .where({ id })
    .first();

  //   .join('roles', 'rules_headshot.send_to', 'roles.id')
}

async function addEngineToUser(engine) {
  const [addedEngineID] = await db('rules').insert(engine, 'id');
  const engineInfo = await getEnginesById(addedEngineID);
  return engineInfo;
}

module.exports = {
  getEngines,
  getEnginesById,
  addEngineToUser,
};
