exports.up = function(knex, Promise) {
  return knex.schema.createTable('reviews', table => {
    table.increments();
    table
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
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
    table
      .integer('rating')
      .unsigned()
      .notNullable();
    table.string('comment');
    table
      .timestamp('review_date')
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('reviews');
};
