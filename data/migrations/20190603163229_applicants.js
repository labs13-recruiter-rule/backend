exports.up = function(knex, Promise) {
  return knex.schema.createTable('applicants', table => {
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
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('applicants');
};
