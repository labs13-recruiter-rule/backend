exports.up = function(knex, Promise) {
  return knex.schema.createTable('jobCandidateLanguages', tbl => {
    tbl.increments();
    tbl
      .integer('job_candidate_id')
      .references('id')
      .inTable('jobCandidates')
      .notNullable()
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
    tbl.string('language_name');
    tbl.string('proficiency');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('jobCandidateLanguages');
};
