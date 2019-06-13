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

module.exports = {
  getRulesByEngineId,
  getRuleByRuleId,
  addRuletoEngine,
};
