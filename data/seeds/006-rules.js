exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('rules')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('rules').insert([
        {
          id: 1,
          user_id: 'abc123cba',
          rule: {
            key: 'value1',
            'data type': 'I am experimenting with JSON shape',
          },
          addressee_type: 7,
        },
        {
          id: 2,
          user_id: 'abc123cba',
          rule: { key: 'value2' },
          addressee_type: 8,
        },
        {
          id: 3,
          user_id: 'abc123cba',
          rule: { key: 'value3', test: 'testing' },
          addressee_type: 9,
        },
        {
          id: 4,
          user_id: 'xyz987zyx',
          rule: {
            key: 'value4',
            'multiple values': {
              test: 'we can have many values',
              test2: 'just like this',
            },
          },
          addressee_type: 1,
        },
        {
          id: 5,
          user_id: 'xyz987zyx',
          rule: { key: 'value5' },
          addressee_type: 2,
        },
        {
          id: 6,
          user_id: 'xyz987zyx',
          rule: { key: 'value6' },
          addressee_type: 3,
        },
        {
          id: 7,
          user_id: 'abc123xyz',
          rule: { key: 'value7' },
          addressee_type: 6,
        },
        {
          id: 8,
          user_id: 'abc123xyz',
          rule: { key: 'value8' },
          addressee_type: 5,
        },
        {
          id: 9,
          user_id: 'abc123xyz',
          rule: { key: 'value9' },
          addressee_type: 4,
        },
      ]);
    });
};
