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
          engine_id: 1,
          rule: {
            key: 'value1',
            'data type': 'I am experimenting with JSON shape',
          },
          addressee_id: 7,
        },
        {
          id: 2,
          user_id: 'abc123cba',
          engine_id: 1,
          rule: { key: 'value2' },
          addressee_id: 8,
        },
        {
          id: 3,
          user_id: 'abc123cba',
          engine_id: 2,
          rule: { key: 'value3', test: 'testing' },
          addressee_id: 9,
        },
        {
          id: 4,
          user_id: 'xyz987zyx',
          engine_id: 3,

          rule: {
            key: 'value4',
            'multiple values': {
              test: 'we can have many values',
              test2: 'just like this',
            },
          },
          addressee_id: 1,
        },
        {
          id: 5,
          user_id: 'xyz987zyx',
          engine_id: 1,
          rule: { key: 'value5' },
          addressee_id: 2,
        },
        {
          id: 6,
          user_id: 'xyz987zyx',
          engine_id: 2,
          rule: { key: 'value6' },
          addressee_id: 3,
        },
        {
          id: 7,
          user_id: 'abc123xyz',
          engine_id: 4,
          rule: { key: 'value7' },
          addressee_id: 6,
        },
        {
          id: 8,
          user_id: 'abc123xyz',
          engine_id: 5,
          rule: { key: 'value8' },
          addressee_id: 5,
        },
        {
          id: 9,
          user_id: 'abc123xyz',
          engine_id: 5,
          rule: { key: 'value9' },
          addressee_id: 4,
        },
      ]);
    });
};
