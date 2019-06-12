// const faker = require('faker');
// const knex = require('knex');
// const db = require('../dbConfig');

// const createFake = () => ({
//   profile_photo: faker.image.people(),
//   email: faker.internet.email(),
//   phone_number: faker.phone.phoneNumber(),
//   display_name: faker.name.findName(),
// });

exports.seed = async function(knex, Promise) {
//   const fakeUsers = [];
//   const num = process.env.SEED_NUM || 80;

//   return knex('users').then(function() {
//     //
//     for (let i = 0; i < num; i++) {
//       fakeUsers.push(createFake());
//     }

//     return db('users').insert(fakeUsers);
//   });
};

// THE ABOVE IS COMMENTED OUT BECAUSE OUR FOREIGN KEY TO THE USERS TABLE IS NOW THE FIREBASE_UUID
