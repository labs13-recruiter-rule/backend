
exports.up = function(knex, Promise) {
    return knex.schema.createTable('volunteer', tbl => {
        tbl.increments();
        tbl.string('organization')
        tbl.string('role')
        tbl.string('cause')
        tbl.datetime('start_month')
        tbl.datetime('start_year')
        tbl.datetime('end_month')
        tbl.datetime('end_year')
        tbl.string('description')
        tbl.boolean('currently_volunteering')
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('volunteer');
};