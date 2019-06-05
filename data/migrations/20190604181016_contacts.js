exports.up = function(knex, Promise) {
  return knex.schema.createTable('contacts', table => {
    table.increments(); // id
    table.integer('user_id').references('id').inTable('users'); // user_id
    table.string('email').notNullable(); // email
    table.string('name'); // name
    table.string('title'); // title
    table.boolean('belongs_to_group').defaultTo(false); // belongs_to_group
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('contacts');
};
