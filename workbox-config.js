module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{css,js,html,jpg,png,svg,ico,json}'
	],
	swDest: 'dist/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};