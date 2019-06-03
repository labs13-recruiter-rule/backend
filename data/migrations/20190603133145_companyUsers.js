exports.up = function(knex, Promise) {
  return knex.schema.createTable('companyUsers', table => {
    table.increments(); // id
    table.string('roles').notNullable();
    tbl
      .integer('company_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('companies')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE'); // foreign key references company id
    tbl
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE'); // foreign key references user id
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('companyUsers');
};
