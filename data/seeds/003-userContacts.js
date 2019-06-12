exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('userContacts')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('userContacts').insert([
        {
          id: 1,
          user_id: 'abc123cba',
          name: 'Harry Potter',
          email: 'chosenone@gmail.com',
        },
        {
          id: 2,
          user_id: 'abc123xyz',
          name: 'Hermione Granger',
          email: 'griffindorgirl@gmail.com',
        },
        {
          id: 3,
          user_id: 'xyz987zyx',
          name: 'Ron Weasley',
          email: 'quidditchrulez@gmail.com',
        },
        {
          id: 4,
          user_id: 'abc123cba',
          name: 'He Who Must Not Be Named',
          email: 'voldemort@gmail.com',
        },
        {
          id: 5,
          user_id: 'abc123xyz',
          name: 'Albus Dumbledore',
          email: 'hogwartsheadmaster@gmail.com',
        },
        {
          id: 6,
          user_id: 'xyz987zyx',
          name: 'Draco Malfoy',
          email: 'draco@gmail.com',
        },
        {
          id: 7,
          user_id: 'abc123cba',
          name: 'Severus Snape',
          email: 'potionsmaster321@gmail.com',
        },
        {
          id: 8,
          user_id: 'abc123xyz',
          name: 'Dobby the House Elf',
          email: 'dobbyisfree@gmail.com',
        },
        {
          id: 9,
          user_id: 'xyz987zyx',
          name: 'Hagrid',
          email: 'hagrid@gmail.com',
        },
      ]);
    });
};
