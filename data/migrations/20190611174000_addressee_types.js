exports.up = function(knex, Promise) {
  return knex.schema.createTable('addressee_types', table => {
    table.increments(); // id

    table.string('addressee_type'); // for example 'manager' or 'supervisor' -- the user can call their addressee types whatever they want

    table
      .string('user_id')
      .references('firebase_uuid')
      .inTable('users'); // foreign key that refers to the firebase_uuid on the users table
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('addressee_types');
};
