exports.up = function(knex, Promise) {
  return knex.schema.createTable('jobCandidateEducation', tbl => {
    tbl.increments();
    tbl
      .integer('job_candidate_id')
      .references('id')
      .inTable('jobCandidates')
      .notNullable()
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');

    tbl.string('school_name');
    tbl.integer('graduation_year').unsigned();
    tbl.integer('graduation_month').unsigned();
    tbl.string('degree_type');
    tbl.string('majors');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('jobCandidateEducation');
};
