
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('rules_headshot').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('rules_headshot').insert([
        { engine_id: 1, send_to: 1, existed: true },
        { engine_id: 1, send_to: 2, existed: false },
        // {id: 3, colName: 'rowValue3'}
      ]);
    });
};

