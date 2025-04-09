module.exports = {
    testEnvironment: 'node',
    testTimeout: 120000,
    verbose: true,
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testPathIgnorePatterns: [
        '/node_modules/',
        '/build/',
        '/dist/'
    ],
    transform: {
        '^.+\\.js$': 'babel-jest'
    },
    collectCoverageFrom: [
        'src/**/*.js',
        '!**/node_modules/**',
        '!**/build/**',
        '!**/dist/**'
    ],
    preset: 'jest-puppeteer'
}; 