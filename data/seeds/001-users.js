exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          display_name: 'Seed 1',
          profile_photo:
            'https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzEwNC84MTkvb3JpZ2luYWwvY3V0ZS1raXR0ZW4uanBn',
          email: 'seed@seed.net',
          phone_number: '5555555555',
          firebase_uuid: 'abc123cba',
        },
        {
          id: 2,
          display_name: 'Seed 2',
          email: 'seed2@seed.net',
          phone_number: '5555555555',
          firebase_uuid: 'xyz987zyx',
        },
        {
          id: 3,
          display_name: 'Seed 3',
          profile_photo:
            'https://cdn1.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg',
          email: 'seed3@seed.net',
          phone_number: '5555555555',
          firebase_uuid: 'abc123xyz',
        },
      ]);
    });
};
