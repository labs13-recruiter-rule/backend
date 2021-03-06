exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments(); // id
    table.string('firebase_uuid').unique(); // firebase uuid
    table.string('display_name');
    table.string('profile_photo'); // faker.js avatar
    table.string('email'); // faker.js email
    table.string('phone_number'); // faker.js phoneNumber
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
