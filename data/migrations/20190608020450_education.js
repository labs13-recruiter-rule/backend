exports.up = function (knex, Promise) {
    return knex.schema.createTable('ruleEducation', tbl => {
        tbl.increments();
        // tbl.string('school')
        // tbl.string('degree')
        // tbl.string('field_of_study')
        // tbl.datetime('start_year')
        // tbl.datetime('end_year')
        // tbl.float('grade')
        // tbl.string('activities_and_societies')
        // tbl.string('description')
        
        tbl
            .integer('engine_id')
            .references('id')
            .inTable('engines');
        tbl
            .integer('engine_id')
            .references('id')
            .inTable('engines');

        id int [pk]
        engineId int [ref: > engine.id]
        keywordContained boolean
        keyword varchar
        recipient int [ref: > role.id]
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('ruleEducation');
};