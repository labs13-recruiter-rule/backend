exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('email_history')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('email_history').insert([
        {
          id: 1,
          user_id: 'abc123cba',
          contact_id: 4,
          candidate_id: 1,
          personalized_message:
            'LOREM IPSUM aoeurp9ehrgaperhgaper439t7340ty9urtp9gu',
        },
        {
          id: 2,
          user_id: 'xyz987zyx',
          contact_id: 9,
          candidate_id: 3,
          personalized_message:
            'LOREM IPSUM aoeurp9ehrgaperhg239347tp3urtggurtp9gu',
        },
        {
          id: 3,
          user_id: 'abc123xyz',
          contact_id: 8,
          candidate_id: 2,
          personalized_message: 'LOREM IPSUM aoeurp9ehrgap23u394t70errurtp9gu',
        },
        {
          id: 4,
          user_id: 'abc123xyz',
          contact_id: 5,
          candidate_id: 2,
          personalized_message: 'LOREM IPSUM aoeurp9ehrgap23u394t70errurtp9gu',
        },
      ]);
    });
};
