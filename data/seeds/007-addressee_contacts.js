exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('addressee_contacts')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('addressee_contacts').insert([
        {
          id: 1,
          user_id: 'abc123cba',
          addressee_id: 7,
          contact_id: 1,
        },
        {
          id: 2,
          user_id: 'abc123cba',
          addressee_id: 7,
          contact_id: 4,
        },
        {
          id: 3,
          user_id: 'abc123cba',
          addressee_id: 8,
          contact_id: 7,
        },
        {
          id: 4,
          user_id: 'abc123cba',
          addressee_id: 9,
          contact_id: 7,
        },
        {
          id: 5,
          user_id: 'xyz987zyx',
          addressee_id: 1,
          contact_id: 3,
        },
        {
          id: 6,
          user_id: 'xyz987zyx',
          addressee_id: 1,
          contact_id: 6,
        },
        {
          id: 7,
          user_id: 'xyz987zyx',
          addressee_id: 2,
          contact_id: 9,
        },
        {
          id: 8,
          user_id: 'xyz987zyx',
          addressee_id: 3,
          contact_id: 6,
        },
        {
          id: 9,
          user_id: 'xyz987zyx',
          addressee_id: 3,
          contact_id: 9,
        },
        {
          id: 10,
          user_id: 'abc123xyz',
          addressee_id: 6,
          contact_id: 8,
        },
        {
          id: 11,
          user_id: 'abc123xyz',
          addressee_id: 5,
          contact_id: 5,
        },
        {
          id: 12,
          user_id: 'abc123xyz',
          addressee_id: 4,
          contact_id: 2,
        },
        {
          id: 13,
          user_id: 'abc123xyz',
          addressee_id: 4,
          contact_id: 5,
        },
      ]);
    });
};
