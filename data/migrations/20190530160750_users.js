exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments(); // id
    table.string('firebase_uuid').unique(); // firebase uuid
    table.string('first_name').notNullable(); // faker.js firstName
    table.string('last_name').notNullable(); // faker.js lastName
    table.string('profile_photo'); // faker.js avatar
    table.string('email'); // faker.js email
    table.integer('phone_number'); // faker.js phoneNumber
    table.integer('job_title');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
