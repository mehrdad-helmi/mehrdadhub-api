import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class LoginDto {
	@ApiProperty({
		description: 'The email address of the user',
		example: 'user@example.com',
	})
	@IsEmail(undefined, { message: 'Invalid email address' })
	email: string;

	@ApiProperty({
		description: 'The password for the user account',
	})
	password: string;
}
