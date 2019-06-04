const faker = require('faker');

const createCandidate = () => {
  const currently_employed = faker.random.boolean()

  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    phone_number: faker.phone.phoneNumber(),
    currently_employed,
    current_company: currently_employed ? faker.company.companyName() : null,
    actively_searching: faker.random.boolean(),
    industry: faker.name.jobArea(),
    current_position: faker.name.jobTitle(),
    years_of_experience: faker.random.number(30),
    city: faker.address.city(),
    state: faker.address.state(),
    zip_code: faker.address.zipCode(),
    country: faker.address.country(),
  }
}

exports.seed = function(knex, Promise) {

  const fakeCandidates = [];
  const num = process.env.SEED_NUM || 50;
  // Deletes ALL existing entries
  return knex('jobCandidates').truncate()
    .then(function () {

      while( fakeCandidates.length < num ) {
        fakeCandidates.push(createCandidate ())
      }
      // Inserts seed entries
      return knex('jobCandidates').insert(fakeCandidates);
    });
};
