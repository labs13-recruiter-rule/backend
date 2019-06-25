const db = require('../../data/dbConfig');

async function getEngines() {
  return db('engines');
}

function getEnginesById(id) {
  return db('engines')
    .where({ id })
    .first();

  //   .join('roles', 'rules_headshot.send_to', 'roles.id')
}

function getFallbackName(engine_id) {
  return db('engines')
  .where({id: engine_id})
  .select('fallbackName')
}

function getFallbackEmail(engine_id) {
  return db('engines')
  .where({id: engine_id}).first()
  .select('fallbackEmail')
}

function getFallbackNameAndEmail(engine_id) {
  return db('engines')
  .where({id: engine_id}).first()
  .select('fallbackEmail', 'fallbackName')
}


function getEnginesByUUID(user_id) {
  return db('engines').where({ user_id });
}

async function addEngineToUser(engine) {
  const [addedEngineID] = await db('engines').insert(engine, 'id');
  const engineInfo = await getEnginesById(addedEngineID);
  return engineInfo;
}

async function modifyUserEngine(id, engine) {
  try {
    const engineToModify = await getEnginesById(id);
    if (engineToModify) {
      try {
        const modifiedEngine = await db('engines')
          .where({ id })
          .first()
          .update(engine);
        return modifiedEngine;
      } catch (error) {
        console.log(error);
      }
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}

async function deleteUserEngine(id) {
  try {
    const engineToDelete = await getEnginesById(id);
    if (engineToDelete) {
      try {
        const deletedEngine = await db('engines')
          .where({ id })
          .first()
          .delete();

        return deletedEngine;
      } catch (error) {
        console.log(error);
      }
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}


module.exports = {
  getEngines,
  getEnginesById,
  addEngineToUser,
  getEnginesByUUID,
  modifyUserEngine,
  deleteUserEngine,
  getFallbackEmail,
  getFallbackName,
  getFallbackNameAndEmail
};
