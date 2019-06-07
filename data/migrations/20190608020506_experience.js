exports.up = function (knex, Promise) {
    return knex.schema.createTable('experience', tbl => {
        tbl.increments();
        tbl.string('title')
        tbl.string('company')
        tbl.string('location')
        tbl.datetime('start_month')
        tbl.datetime('start_year')
        tbl.datetime('end_month')
        tbl.datetime('end_year')
        tbl.string('description')
        tbl.boolean('currently_working')
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('experience');
};