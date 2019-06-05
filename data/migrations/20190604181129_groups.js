exports.up = function(knex, Promise) {
  return knex.schema.createTable('groups', table => {
    table.increments(); // id
    table.string('name'); // name
    table.text('notes'); // notes
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('groups');
};
