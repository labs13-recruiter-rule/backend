exports.up = function(knex, Promise) {
  return knex.schema.createTable('jobCandidateWorkExperience', tbl => {
    tbl.increments();
    tbl
      .integer('job_candidate_id')
      .references('id')
      .inTable('jobCandidates')
      .notNullable()
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
    tbl.integer('start_date_month');
    tbl.integer('start_date_year');
    tbl.integer('end_date_month');
    tbl.integer('end_date_year');
    tbl.string('job_title');
    tbl.string('company_name');
    tbl.string('city');
    tbl.string('state');
    tbl.string('zip_code');
    tbl.string('country');
    tbl.string('job_description');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('jobCandidateWorkExperience');
};
