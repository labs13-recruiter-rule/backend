exports.up = function(knex, Promise) {
  return knex.schema.createTable('email_history', table => {
    table.increments();
    table
      .string('user_id')
      .references('firebase_uuid')
      .inTable('users'); // foreign key referring to the firebase_uuid in the users table.

    table
      .integer('candidate_id')
      .references('id')
      .inTable('candidates'); // foreign key referring to the id on the candidates table.
    table
      .integer('contact_id')
      .references('id')
      .inTable('userContacts'); // foreign key referring to the id on the userContacts table. This is a foreign key with contacts instead of addressee_types because if the contacts on an addressee type change, we still want the history to be correct.

    table.timestamp('send_date').defaultTo(knex.fn.now()); // timestamp that defaults to the time when a row is added to the table. -- we should have the system post to this table when an email sends to addressee type.

    table.text('personalized_message'); // the message a user added to send to the contact.
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('email_history');
};
