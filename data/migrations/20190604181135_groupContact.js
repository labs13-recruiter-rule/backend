exports.up = function(knex, Promise) {
  return knex.schema.createTable('groupContacts', table => {
    table.increments(); // id
    table.integer('contact_id').references('id').inTable('contacts'); // contact_id
    table.integer('group_id').references('id').inTable('groups'); // group_id
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('groupContacts');
};
