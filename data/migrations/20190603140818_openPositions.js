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
    table.timestamp('posted_date').defaultTo(knex.fn.now());
    table.integer('fill_by_month');
    table.integer('fill_by_day');
    table.integer('fill_by_year');
    table.integer('job_description').text();
    table.integer('job_requirements').text();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('openPositions');
};
