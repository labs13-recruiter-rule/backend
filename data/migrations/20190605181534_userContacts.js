exports.up = function(knex, Promise) {
  return knex.schema.createTable('userContacts', tbl => {
    tbl.increments();
    tbl
      .string('userContactBelongsTo')
      .references('firebase_uuid')
      .inTable('users')
      .notNullable();
    tbl.string('name').notNullable();
    tbl.string('email').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('userContacts');
};
