exports.up = function(knex, Promise) {
  return knex.schema.createTable('roles', tbl => {
    tbl.increments();
    tbl.string('addressee_type');
    tbl
      .string('user_id')
      .references('firebase_uuid')
      .inTable('users');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('roles');
};
