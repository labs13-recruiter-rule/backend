exports.up = function(knex, Promise) {
  return knex.schema.createTable('companies', table => {
    table.increments(); // id
    table.string('name').notNullable();
    table.string('company_photo');
    tbl
      .integer('company_owner_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE'); // foreign key references user id
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('companies');
};
