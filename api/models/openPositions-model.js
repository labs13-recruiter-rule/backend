const db = require('../../data/dbConfig');

module.exports = {
  getOpenPositions,
  getOpenPositionsByCompany,
  getOpenPositionByPositionID,
  markOpenPositionFilled,
};

function getOpenPositions() {
  return db('openPositions');
}

function getOpenPositionsByCompany(id) {
  return db('openPositions').where({ company_id });
}

function getOpenPositionByPositionID(id) {
  return db('openPositions').where({ id });
}

function removeOpenPosition(id) {}

async function markOpenPositionFilled(id) {
  const stalePosition = await db('openPositions')
    .select('position_filled')
    .where({ id })
    .first();

  const freshPosition = await db('openPositions')
    .where({ id })
    .update('position_filled', !stalePosition.completed);

  return getOpenPositionByPositionID(id);
}
