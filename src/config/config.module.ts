import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import AppConfigs from './config';

const ENV = process.env.NODE_ENV;

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [AppConfigs],
			expandVariables: true,
			isGlobal: true,
			envFilePath: !ENV ? '.env' : `.env.${ENV}`,
		}),
	],
})
export class AppConfigModule {}
