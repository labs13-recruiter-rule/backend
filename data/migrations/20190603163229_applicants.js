exports.up = function(knex, Promise) {
  return knex.schema.createTable('recruitees', table => {
    table.increments('id');
    table
      .integer('open_position_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('openPositions')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
    table
      .integer('job_candidate_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('jobCandidates')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
    table.boolean('applied').defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('recruitees');
};
