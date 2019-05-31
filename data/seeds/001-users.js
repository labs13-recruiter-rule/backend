exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          first_name: 'seed1FirstName',
          last_name: 'lastname',
          profile_photo:
            'https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzEwNC84MTkvb3JpZ2luYWwvY3V0ZS1raXR0ZW4uanBn',
          email: 'seed@seed.net',
          phone_number: 5555555555,
        },
        {
          id: 2,
          first_name: 'seed2FirstName',
          last_name: '2lastname',

          email: 'seed@seed.net',
          phone_number: 5555555555,
        },
        {
          id: 3,
          first_name: 'seed3FirstName',
          last_name: '3lastname',
          profile_photo:
            'https://cdn1.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg',
          email: 'seed@seed.net',
          phone_number: 5555555555,
        },
      ]);
    });
};
