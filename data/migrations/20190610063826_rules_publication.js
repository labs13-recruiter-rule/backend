
exports.up = function(knex, Promise) {
    return knex.schema.createTable('rules_publication', tbl => {
        tbl.increments();
        // tbl.string('organization')
        // tbl.string('role')
        // tbl.string('cause')
        // tbl.datetime('start_month')
        // tbl.datetime('start_year')
        // tbl.datetime('end_month')
        // tbl.datetime('end_year')
        // tbl.string('description')
        // tbl.boolean('currently_volunteering')


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
    return knex.schema.dropTableIfExists('rules_publication');
};