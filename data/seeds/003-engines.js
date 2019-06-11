
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('engines').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('engines').insert([
        { userId: 1, description: "this is a test data" },
        // {engine_id: 1, send_to: 3, existed: false },
        // {id: 3, colName: 'rowValue3'}
      ]);
    });
};

