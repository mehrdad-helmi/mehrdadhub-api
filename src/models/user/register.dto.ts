import { ApiProperty }                         from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class RegisterDto {
	@ApiProperty({
		description: 'The email address of the user registering',
		example: 'user@example.com',
	})
	@IsEmail(undefined, { message: 'Invalid email address' })
	email: string;
	
	@ApiProperty({
		description: 'The password for the user account',
		example: 'yourStrong(!)Password',
		minLength: 8,
	})
	@IsStrongPassword(
		{
			minLength: 8,
			minUppercase: 1,
			minLowercase: 1,
			minNumbers: 1,
			minSymbols: 1,
		},
		{
			message:
				'The password is too weak! It must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 symbol.',
		},
	)
	password: string;
	
	@ApiProperty({
		description:"Display name of the user",
		example:'John Doe',
	})
	@IsString({message:'Display name must be a string.'})
	displayName: string;
}
