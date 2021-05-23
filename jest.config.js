module.exports = {
  setupFiles: ['./.jest/jest.setup.js', './.jest/register-context.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  modulePaths: [
    '.',
  ],
  moduleNameMapper: {
    '\\.(css|less|sass)$': '<rootDir>/__mocks__/styleMock.js',
  },
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.stories.js',
  ],
  testURL: 'http://localhost/',
}
