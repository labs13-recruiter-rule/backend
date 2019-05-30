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
  const num = 80;
  // Deletes ALL existing entries

  for (let i = 0; i < num; i++) {
    fakeUsers.push(createFake());
  }
  await knex('users').insert(fakeUsers);

  const fakeUsers2 = [];
  const num2 = 80;
  // Deletes ALL existing entries

  for (let i = 0; i < num2; i++) {
    fakeUsers2.push(createFake());
  }
  await knex('users').insert(fakeUsers2);

  const fakeUsers3 = [];
  const num3 = 80;
  // Deletes ALL existing entries

  for (let i = 0; i < num2; i++) {
    fakeUsers3.push(createFake());
  }
  await knex('users').insert(fakeUsers3);

  const fakeUsers4 = [];
  const num4 = 80;
  // Deletes ALL existing entries

  for (let i = 0; i < num4; i++) {
    fakeUsers4.push(createFake());
  }
  await knex('users').insert(fakeUsers4);

  const fakeUsers5 = [];
  const num5 = 80;
  // Deletes ALL existing entries

  for (let i = 0; i < num5; i++) {
    fakeUsers5.push(createFake());
  }
  await knex('users').insert(fakeUsers5);

  const fakeUsers6 = [];
  const num6 = 80;
  // Deletes ALL existing entries

  for (let i = 0; i < num6; i++) {
    fakeUsers6.push(createFake());
  }
  await knex('users').insert(fakeUsers6);

  const fakeUsers7 = [];
  const num7 = 80;
  // Deletes ALL existing entries

  for (let i = 0; i < num7; i++) {
    fakeUsers7.push(createFake());
  }
  await knex('users').insert(fakeUsers7);
};
