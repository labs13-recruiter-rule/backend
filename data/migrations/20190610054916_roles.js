
exports.up = function(knex, Promise) {
    return knex.schema.createTable('roles', tbl => {
        tbl.increments();
        tbl.string('title')

        tbl
        .integer('user_Id')
        .references('id')
        .inTable('users')
        .notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('roles');
};
