module.exports = {
	apps: [
		{
			name: `mehrdadhub-${process.env.NODE_ENV.toLowerCase()}-api`,
			script: './build/main.js',
			env: {
				NODE_ENV: process.env.NODE_ENV,
				DATABASE_URL: process.env.DATABASE_URL,
				JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
				PORT: process.env.PORT
			},
		},
	],
};
