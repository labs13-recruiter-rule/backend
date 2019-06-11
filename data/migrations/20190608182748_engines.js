
exports.up = function(knex, Promise) {
    return knex.schema.createTable('engines', tbl => {
        tbl.increments();
        // tbl.string('conditions')
        tbl.string('description')
        tbl
        .integer('userId')
        .references('id')
        .inTable('users')
        .notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('engines');
};