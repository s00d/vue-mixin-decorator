module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
	transform: {
		"^.+\\.tsx?$": "ts-jest",
		"^.+\\.jsx?$": "babel-jest"
	},
	transformIgnorePatterns: [
		"/node_modules/(?!lodash-es)"
	],
	testRegex: "(/test/.*(spec))\\.(jsx?|tsx?)$",
	moduleFileExtensions: [
		"ts",
		"tsx",
		"js",
		"jsx",
		"json",
		"node",
		"vue"
	],
	moduleDirectories: [
		"node_modules"
	],
	moduleNameMapper: {
		"^@/(.*)$": "./src/$1"
	}
};
