exports.up = function (knex, Promise) {
    return knex.schema.createTable('candidates', tbl => {
        tbl.increments();
        tbl
            .integer('user_id')
            .references('id')
            .inTable('users');
        tbl
            .integer('contact_id')
            .references('id')
            .inTable('userContacts');
        tbl.string('name').notNullable();
        tbl.string('email').notNullable();
        tbl.string('title');
        tbl.integer('years_of_experience');
        tbl.string('skills');
        tbl.string('education');
        tbl.string('industry');
        tbl.string('languages');
        tbl.string('certifications');
        tbl.string('volunteer');
        tbl.string('publications');
        tbl.boolean('bio');
        tbl.boolean('picture');
        tbl.boolean('posts');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('candidates');
};