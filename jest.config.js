const path = require('path')

module.exports = {
  preset: 'react-native',
  setupFiles: ['./jest.setup.js'],
  transformIgnorePatterns: ['node_modules/(?!react-native|react-native-reanimated|@react-native|@react-navigation)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.(mp3)$': path.join(__dirname, '__mocks__', 'file_mock.js'),
    '^@app/(.*)$': '<rootDir>/app/$1',
    '^@assets/(.*)$': '<rootDir>/app/assets/$1',
    '^@atoms/(.*)$': '<rootDir>/app/components/atoms/$1',
    '^@components/(.*)$': '<rootDir>/app/components/$1',
    '^@hooks/(.*)$': '<rootDir>/app/hooks/$1',
    '^@locales/(.*)$': '<rootDir>/app/locales/$1',
    '^@models/(.*)$': '<rootDir>/app/models/$1',
    '^@molecules/(.*)$': '<rootDir>/app/components/molecules/$1',
    '^@navigators/(.*)$': '<rootDir>/app/navigators/$1',
    '^@organisms/(.*)$': '<rootDir>/app/components/organisms/$1',
    '^@providers/(.*)$': '<rootDir>/app/providers/$1',
    '^@screens/(.*)$': '<rootDir>/app/screens/$1',
    '^@services/(.*)$': '<rootDir>/app/services/$1',
    '^@stores/(.*)$': '<rootDir>/app/stores/$1',
    '^@themes/(.*)$': '<rootDir>/app/themes/$1',
    '^@utils/(.*)$': '<rootDir>/app/utils/$1',
  },
}
