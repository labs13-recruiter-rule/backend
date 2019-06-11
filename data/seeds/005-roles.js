
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('roles').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('roles').insert([
        { title: 'Supervisor', user_Id: 1 },
        { title: 'VP', user_Id: 2 },
      ]);
    });
};

