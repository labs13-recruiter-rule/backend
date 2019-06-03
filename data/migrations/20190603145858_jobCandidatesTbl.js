exports.up = function(knex, Promise) {
  return knex.schema.createTable('jobCandidates', tbl => {
    tbl.increments();
    tbl.string('name').notNullable();
    tbl.string('email');
    tbl.string('phone_number');
    tbl.boolean('currently_employed');
    tbl.string('current_company');
    tbl.boolean('actively_searching');
    tbl.string('industry');
    tbl.string('current_position');
    tbl.integer('years_of_experience');
    tbl.string('city');
    tbl.string('state');
    tbl.string('zip_code');
    tbl.string('country');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('jobCandidates');
};
