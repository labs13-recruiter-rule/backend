exports.up = function(knex, Promise) {
  return knex.schema.createTable('jobCandidateProjects', tbl => {
    tbl.increments();
    tbl
      .integer('job_candidate_id')
      .references('id')
      .inTable('jobCandidates')
      .notNullable()
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
    tbl.string('project_name');
    tbl.string('project_url');
    tbl.string('project_description');
    tbl.integer('project_start_month');
    tbl.integer('project_start_year');
    tbl.integer('project_end_month');
    tbl.integer('project_end_year');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('jobCandidateProjects');
};
