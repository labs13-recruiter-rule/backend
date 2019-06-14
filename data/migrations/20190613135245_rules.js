exports.up = function(knex, Promise) {
  return knex.schema.createTable('rules', tbl => {
    tbl.increments();
    tbl
      .string('user_id')
      .references('firebase_uuid')
      .inTable('users')
      .notNullable(); // foreign key referring to the firebase_uuid in the users table.
    tbl
      .integer('engine_id')
      .references('id')
      .inTable('engines')
      .notNullable(); // foreign key referring to the engine_id in the engines table.

    tbl.json('rule'); // This holds the JSON object for an individual 'rule' or rule-set -- basically the set of conditions pertaining to an 'event', i.e., sending to the specified addressee_type.

    tbl
      .integer('addressee_id')
      .references('id')
      .inTable('addressee_types'); // foreign key referring to the id in the addressee_types table.
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('rules');
};
