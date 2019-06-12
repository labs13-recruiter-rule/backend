exports.up = function(knex, Promise) {
  return knex.schema.createTable('candidates', tbl => {
    tbl.increments();
    tbl
      .string('user_id')
      .references('firebase_uuid')
      .inTable('users');
    tbl.string('name').notNullable();
    tbl.string('email').notNullable();
    tbl.string('title');
    tbl.integer('years_of_experience');
    tbl.string('skills');
    tbl.string('education');
    tbl.string('industry');
    tbl.string('languages');
    tbl.string('certifications');
    tbl.string('volunteer');
    tbl.string('publications');
    tbl.boolean('bio');
    tbl.boolean('picture');
    tbl.boolean('posts');
    tbl.string('linkedin_url');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('candidates');
};
