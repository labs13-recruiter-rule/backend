exports.up = function(knex, Promise) {
  return knex.schema.createTable('userContacts', tbl => {
    tbl.increments();
    tbl
      .integer('userContactBelongsTo')
      .references('id')
      .inTable('users')
      .notNullable();
    tbl.string('name').notNullable();
    tbl.string('email').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('userContacts');
};
