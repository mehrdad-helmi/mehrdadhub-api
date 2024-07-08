import { Injectable }       from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User }             from '@prisma/client';
import { Strategy }         from 'passport-local';
import { AuthService }      from '../auth.service';



/**
 * Custom local authentication strategy
 */
@Injectable()
export class AuthLocalStrategy extends PassportStrategy(
	Strategy,
	'auth-local-strategy',
) {
	constructor(private authService: AuthService) {
		/**
		 * Calling PassportStrategy constructor to config the local strategy
		 * this will change the default "username" filed to "email"
		 */
		super({ usernameField: 'email' });
	}

	/**
	 * Passport library use this method to validate the credentials
	 * provided in request's body
	 * @param username
	 * @param password
	 */
	async validate(username: string, password: string): Promise<User> {
		return this.authService.validateUser(username, password);
	}
}
