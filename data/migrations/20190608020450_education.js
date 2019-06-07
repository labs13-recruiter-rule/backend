exports.up = function (knex, Promise) {
    return knex.schema.createTable('education', tbl => {
        tbl.increments();
        tbl.string('school')
        tbl.string('degree')
        tbl.string('field_of_study')
        tbl.datetime('start_year')
        tbl.datetime('end_year')
        tbl.float('grade')
        tbl.string('activities_and_societies')
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('education');
};