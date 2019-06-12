exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('addressee_types')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('addressee_types').insert([
        { id: 1, addressee_type: 'manager', user_id: 'xyz987zyx' },
        { id: 2, addressee_type: 'supervisor', user_id: 'xyz987zyx' },
        { id: 3, addressee_type: 'director', user_id: 'xyz987zyx' },
        { id: 4, addressee_type: 'interviewer', user_id: 'abc123xyz' },
        { id: 5, addressee_type: 'hiring manager', user_id: 'abc123xyz' },
        { id: 6, addressee_type: 'department director', user_id: 'abc123xyz' },
        { id: 7, addressee_type: 'engineering manager', user_id: 'abc123cba' },
        { id: 8, addressee_type: 'sales manager', user_id: 'abc123cba' },
        { id: 9, addressee_type: 'marketing manager', user_id: 'abc123cba' },
      ]);
    });
};
