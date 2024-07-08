import { excludeFields }                                                  from '@mehrdadhub/common';
import { MESSAGES }                                                       from '@mehrdadhub/locales/en';
import { HashService }                                                                          from '@mehrdadhub/providers';
import { loginResponse }                                                                        from '@mehrdadhub/types';
import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService }                                                                           from '@nestjs/jwt';
import { User }                                                           from '@prisma/client';
import { UserService }                                            from '../models/user/user.service';



/**
 * Service for all authentication and authorization related controllers
 */
@Injectable()
export class AuthService {
	constructor(
		private readonly hashService: HashService,
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
	) {}

	/**
	 * Validates a user's credentials by checking the provided email and password against
	 * the corresponding records in the database. It also checks the user's account status
	 * to ensure the account is active and not suspended or deactivated.
	 *
	 * @param email The email address provided by the user attempting to authenticate.
	 * @param password The plain-text password provided by the user for authentication.
	 * @returns A sanitized user object without sensitive data, if validation is successful.
	 * @throws {UnauthorizedException} If the user cannot be found, the password is invalid,
	 *         the account is deactivated, or the account is suspended.
	 * @throws {InternalServerErrorException} If there's an error during
	 * the password comparison process.
	 */
	public async validateUser(email: string, password: string): Promise<any> {
		const user = await this.userService.findUserByEmail(email);
		// Check to see a valid user exist before continuing (performance reasons).
		if (!user) throw new UnauthorizedException(MESSAGES.AUTH.LOGIN.WRONG_EMAIL);

		const isPasswordValid = await this.hashService.compare(
			password,
			user.hashedPassword,
		);

		if (!isPasswordValid) 
			throw new BadRequestException(MESSAGES.AUTH.LOGIN.WRONG_PASSWORD);
		

		return excludeFields(user, ['hashedPassword']);
	}

	/**
	 * Issues a new JSON Web Token (JWT) for authenticated users. After a successful login,
	 * this token is used to secure subsequent requests by including it in the request header.
	 * The JWT payload includes essential user information required for authorization checks.
	 *
	 * @param user The user object representing the authenticated user from the database.
	 * @returns An object containing the signed JWT as 'access_token'.
	 * @throws {UnauthorizedException} If the JWT signing fails,
	 * indicating the login process cannot be completed securely.
	 */
	public async login(user: User) {
		try {
			return await this.getTokens(user);
		} catch (error) {
			// Log the error or handle it as per the application's error handling policy.
			console.error(' 🚫  Error signing JWT for user login:', error);
			throw new InternalServerErrorException(
				'Login cannot be processed at this time.',
			);
		}
	}

	/**
	 * Generates both access and refresh tokens for a given user.
	 * This method uses `Promise.all` for concurrent generation of both tokens.
	 *
	 * @param user The user object containing details to be encoded in the JWT.
	 * @returns An object containing both the access and refresh tokens.
	 */
	private async getTokens(user: User): Promise<loginResponse> {
		const userData = {
			email: user.email,
			displayName: user.displayName,
			userId: user.id,
		}
		const accessToken = await this.jwtService.signAsync(userData);

		return {
			accessToken,
			...userData
		};
	}
}
