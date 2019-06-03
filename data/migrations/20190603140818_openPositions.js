exports.up = function(knex, Promise) {
  return knex.schema.createTable('openPositions', table => {
    table.increments(); // id
    table.string('position_name').notNullable();
    table
      .integer('company_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('companies')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE'); // foreign key references company id

    table.integer('number_of_positions');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('openPositions');
};
