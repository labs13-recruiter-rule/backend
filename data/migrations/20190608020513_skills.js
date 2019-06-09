
exports.up = function(knex, Promise) {
    return knex.schema.createTable('rules_skills', tbl => {
        tbl.increments();
        // tbl.string('skill')

        tbl
        .integer('engine_id')
        .references('id')
        .inTable('engines');

        tbl
        .integer('send_to')
        .references('id')
        .inTable('roles');

        tbl.string('keyword')
        tbl.boolean('keywordContained')
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('rules_skills');
};
