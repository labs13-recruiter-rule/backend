const faker = require('faker');
const knex = require('knex');
const db = require('../dbConfig');

const createFake = () => ({
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  profile_photo: faker.image.people(),
  email: faker.internet.email(),
  phone_number: faker.phone.phoneNumber(),
});

exports.seed = async function(knex, Promise) {
  const fakeUsers = [];
  const num = process.env.SEED_NUM || 80;

  return knex('users')
    .truncate()
    .then(function() {
      //
      for (let i = 0; i < num; i++) {
        fakeUsers.push(createFake());
      }

      return db('users').insert(fakeUsers);
    });
};
