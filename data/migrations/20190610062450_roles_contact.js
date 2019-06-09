
exports.up = function(knex, Promise) {
    return knex.schema.createTable('roles_contact', tbl => {
        tbl.increments();
        tbl.string('title')

        tbl
        .integer('userContacts_Id')
        .references('id')
        .inTable('UserContacts')
        .notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('roles_contact');
};
