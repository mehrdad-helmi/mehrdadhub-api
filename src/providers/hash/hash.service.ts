import { Injectable } from '@nestjs/common';
import { randomBytes, scrypt, timingSafeEqual } from 'crypto';

/**
 * Service providing secure string hashing and verification using scrypt.
 * It handles salt generation and timing attack protection to ensure security best practices.
 * @version 0.1.0
 */
@Injectable()
export class HashService {
	// Constants for the salt and key lengths, and the hash segment separator.
	private readonly SALT_BYTE_SIZE = 32;

	private readonly KEY_LENGTH = 64;

	private readonly HASH_SEGMENT_SEPARATOR = '!221B_BAKER_STREET!';

	/**
	 * Hashes a password using scrypt algorithm with a randomly generated salt.
	 * @returns A promise resolving to the salt and hash concatenated with a separator.
	 * @throws Throws an error if hashing fails.
	 * @version 0.1.0
	 * @param string
	 */
	public async hash(string: string): Promise<string> {
		return new Promise((resolve, reject) => {
			// generate random 16 bytes long salt - recommended by NodeJS Docs
			const salt = randomBytes(this.SALT_BYTE_SIZE).toString('hex');

			scrypt(string, salt, this.KEY_LENGTH, (err, derivedKey) => {
				if (err) reject(err);
				// derivedKey is of type Buffer
				resolve(
					`${salt}${this.HASH_SEGMENT_SEPARATOR}${derivedKey.toString('hex')}${
						this.HASH_SEGMENT_SEPARATOR
					}${this.KEY_LENGTH}`,
				);
			});
		});
	}

	/**
	 * Compares a plain text password with a hashed password to verify if they match.
	 * Uses timingSafeEqual to prevent timing attacks.
	 * @param string - The plain text password to verify.
	 * @param hashedString - The hashed password to compare against.
	 * @returns A promise resolving to a boolean indicating whether the passwords match.
	 * @throws Throws an error if comparison fails.
	 * @version 0.1.0
	 */
	public compare = async (
		string: string,
		hashedString: string,
	): Promise<boolean> =>
		new Promise((resolve, reject) => {
			const [salt, hashKey, keyLength] = hashedString.split(
				this.HASH_SEGMENT_SEPARATOR,
			);
			// we need to pass buffer values to timingSafeEqual
			const hashKeyBuff = Buffer.from(hashKey, 'hex');
			scrypt(string, salt, +keyLength, (err, derivedKey) => {
				if (err) reject(err);
				// compare the new supplied password with the hashed password using timeSafeEqual
				resolve(timingSafeEqual(hashKeyBuff, derivedKey));
			});
		});
}
