exports.up = function(knex, Promise) {
  return knex.schema.createTable('jobCandidateCertifications', tbl => {
    tbl.increments();
    tbl
      .integer('job_candidate_id')
      .references('id')
      .inTable('jobCandidates')
      .notNullable()
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
    tbl.string('certificate_name');
    tbl.string('organization');
    tbl.integer('completed_month');
    tbl.integer('completed_year');
    tbl.boolean('expires');
    tbl.integer('expiration_month');
    tbl.integer('expiration_year');
    tbl.string('verification_url');
    tbl.string('verification_id');
    //
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('jobCandidateCertifications');
};
