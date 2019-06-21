const includeCoverage = process.env.DB_ENV === 'testing';

module.exports = {
  collectCoverage: includeCoverage,
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
};
