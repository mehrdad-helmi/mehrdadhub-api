/**
 * JWT payload type
 */
export type JwtPayload = {
	/**
	 * User's ID
	 */
	userId: number;

	/**
	 * User's email'
	 */
	email: string;
	
	/**
	 * User's display name
	 */
	displayName:string;
};

type Token = string;

/**
 * authentication token type.
 */
export type loginResponse = {
	accessToken: Token;
	email:string;
	displayName:string;
	userId:number;
};
