exports.up = function(knex, Promise) {
  return knex.schema.createTable('addressee_contacts', table => {
    // this table holds the contacts associated with each addressee type for each user.
    table.increments(); // id

    table
      .string('user_id')
      .references('firebase_uuid')
      .inTable('users'); // foreign key referring to the firebase_uuid in the users table

    table
      .integer('addressee_id')
      .references('id')
      .inTable('addressee_types'); // foreign key with id on addressee_types table

    table
      .integer('contact_id')
      .references('id')
      .inTable('userContacts'); // foreign key with id on userContacts table
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('addressee_contacts');
};
