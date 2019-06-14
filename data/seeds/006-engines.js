exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('engines')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('engines').insert([
        {
          id: 1,
          user_id: 'abc123cba',
          engine_name: 'React Dev',
        },
        {
          id: 2,
          user_id: 'abc123cba',
          engine_name: 'FrontEnd Dev',
        },
        {
          id: 3,
          user_id: 'abc123cba',
          engine_name: 'BackEnd Dev',
        },
        {
          id: 4,
          user_id: 'abc123cba',
          engine_name: 'JS Dev',
        },
        {
          id: 5,
          user_id: 'abc123cba',
          engine_name: 'JavaScript Dev',
        },
      ]);
    });
};
