import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../models/user/user.module';
import { HashModule } from '../providers/hash/hash.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import {
	AuthJWTStrategy,
	AuthLocalStrategy,
} from './strategies';
import { JwtAccessAuthGuard } from './guards';

@Module({
	imports: [
		PassportModule.register({defaultStrategy:'auth-jwt-strategy'}),
		JwtModule.registerAsync({
			useFactory: (configService: ConfigService) => ({
				secret: configService.get<string>('JWT_ACCESS_SECRET'),
				signOptions: {
					expiresIn: configService.get<string>('jwtExpiresIn'),
				},
			}),
			inject: [ConfigService],
		}),
		UserModule,
		HashModule
	],
	controllers: [AuthController],
	providers: [
		{
			provide: APP_GUARD,
			useClass: JwtAccessAuthGuard,
		},
		AuthService,
		AuthLocalStrategy,
		AuthJWTStrategy
	],
})
export class AuthModule {}
