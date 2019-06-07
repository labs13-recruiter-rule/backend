
exports.up = function(knex, Promise) {
    return knex.schema.createTable('skills', tbl => {
        tbl.increments();
        tbl.string('skill')
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('skills');
};
