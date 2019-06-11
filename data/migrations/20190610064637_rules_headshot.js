
exports.up = function(knex, Promise) {
    return knex.schema.createTable('rules_headshot', tbl => {
        tbl.increments();

        tbl
        .integer('engine_id')
        .references('id')
        .inTable('engines');

        tbl
        .integer('send_to')
        .references('id')
        .inTable('roles');

        tbl.boolean('existed')
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('rules_headshot');
};