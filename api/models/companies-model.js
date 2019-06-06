const db = require('../../data/dbConfig');

const table = 'companies';

module.exports = {
  getCompanies,
};

async function getCompanies() {
  return db(table);
}
