module.exports = {
	apps: [
		{
			name: 'mehrdadhub-staging-api',
			script: './build/main.js',
			env: {
				NODE_ENV: 'development',
				DATABASE_URL:
					'postgresql://redhat:09194215237@host.docker.internal:5432/mehrdadhub-db?schema=public',
				JWT_ACCESS_SECRET: 'D7@pGk*1#Lz&Q8%yWx!z4^Yf$3@UvN9lS#2$Tj5^Pb@V6%mR',
			},
		},
	],
};
