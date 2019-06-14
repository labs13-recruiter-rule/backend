const db = require('../../data/dbConfig');

function getRulesByEngineId(engine_id) {
  return db('rules').where({ engine_id });
}

function getRuleByRuleId(engine_id, id) {
  // get by both to ensure no accessing of rules outside of created engine
  return db('rules')
    .where({ engine_id, id })
    .first();
}

async function addRuletoEngine(engine_id, rule) {
  //
  const [addedRuleID] = await db('rules').insert(rule, 'id');
  console.log(addedRuleID);
  const addedRuleInfo = await getRuleByRuleId(engine_id, addedRuleID);
  return addedRuleInfo;
}

async function modifyEngineRule(engine_id, id, rule) {
  try {
    const ruleToModify = await getRuleByRuleId(engine_id, id);
    if (ruleToModify) {
      try {
        const modifiedRule = await db('rules')
          .where({ engine_id, id })
          .first()
          .update(rule);
        return modifiedRule;
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

async function deleteEngineRule(engine_id, id) {
  try {
    const ruleToDelete = await getRuleByRuleId(engine_id, id);
    if (ruleToDelete) {
      try {
        const deletedRule = await db('rules')
          .where({ engine_id, id })
          .first()
          .delete();

        return deletedRule;
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
  getRulesByEngineId,
  getRuleByRuleId,
  addRuletoEngine,
  modifyEngineRule,
  deleteEngineRule,
};
