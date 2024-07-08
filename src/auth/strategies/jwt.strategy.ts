import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '@mehrdadhub/types';

/**
 * Custom JWT access token strategy for user.
 */
@Injectable()
export class AuthJWTStrategy extends PassportStrategy(
	Strategy,
	'auth-jwt-strategy',
) {
	constructor(readonly configService: ConfigService) {
		/**
		 * Calling PassportStrategy constructor to config the JWT strategy
		 */
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get<string>('JWT_ACCESS_SECRET'),
		});
	}

	/**
	 * Passport library use this method to validate the jwt token
	 * provided in request's header
	 * @param payload
	 */
	validate(payload: JwtPayload) {
		return payload;
	}
}
