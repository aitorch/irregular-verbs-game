module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  testEnvironment: 'node',
  moduleFileExtensions: ['js'],
  setupFiles: ['./src/__mocks__/localStorage.js']

};
