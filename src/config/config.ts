import { ConfigObject } from '@nestjs/config/dist/types/config-object.type';
import * as packageJson from '../../package.json';

export default (): ConfigObject => {
	const appConfigs = {
		isProduction: process.env.NODE_ENV === 'production',
		port: 5050,
		majorVersion: packageJson.version.split('.')[0],
		minorVersion: packageJson.version,
	};
	
	const secretConfigs = {
		jwtExpiresIn: process.env.NODE_ENV === 'production' ? '24h' : '7d',
		jwtRefreshExpiresIn: process.env.NODE_ENV === 'production' ? '7d' : '30d',
	};
	
	const prismaConfig = {
		logLevel: [
			{ level: 'info', emit: 'stdout' },
			{ level: 'error', emit: 'stdout' },
		],
		errorFormat: 'pretty',
		explicitConnect: true,
	};
	if (appConfigs.isProduction)
		prismaConfig.logLevel.push({ level: 'query', emit: 'stdout' });
	return {
		...appConfigs,
		...secretConfigs,
		prismaConfig,
	};
};
