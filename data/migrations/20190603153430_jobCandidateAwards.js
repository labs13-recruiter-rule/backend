exports.up = function(knex, Promise) {
  return knex.schema.createTable('jobCandidateAwards', tbl => {
    tbl.increments();
    tbl
      .integer('job_candidate_id')
      .references('id')
      .inTable('jobCandidates')
      .notNullable()
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');

    tbl.integer('award_month');
    tbl.integer('award_year');
    tbl.string('award_name');
    tbl.string('awarded_by');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('jobCandidateAwards');
};
