
exports.up = function(knex, Promise) {
    return knex.schema.createTable('roles', tbl => {
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
    return knex.schema.dropTableIfExists('roles');
};
