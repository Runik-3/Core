module.exports = {
	rootDir: '.',
	roots: ['.'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
		// '^@config/(.*)': '<rootDir>/src/config/$1',
	},
	globals: {
		'ts-jest': {
			tsconfig: 'tsconfig.json',
		},
	},
	moduleFileExtensions: ['ts', 'js'],
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
	},
	testMatch: ['**/tests/**/*.test.(ts|js)'],
	testEnvironment: 'node',
};
