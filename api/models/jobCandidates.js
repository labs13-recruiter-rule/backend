const db = require('../../data/dbConfig');

const table = 'jobCandidates'

const find = () => db(table)

const findById = (id) => db(table).where({ id }).first();

// passing 'id' as the second parameter is recommended to ensure the id is returned
// when connecting to other database management systems like Postgres
    
const add = item => {
    return db(table)
    .insert(item, 'id')
    .then(([id]) => findById(id))
}

const update = (id, changes) => {
    return db(table)
    .where({ id })
    .update(changes)
    .then(count => {
        if (count > 0) {
            return findById(id)
        } else {
            return null
        } 
    })
}

const remove = (id) => db(table).where({ id }).del()

module.exports = {
  find,
  findById,
  add,
  update,
  remove
};
