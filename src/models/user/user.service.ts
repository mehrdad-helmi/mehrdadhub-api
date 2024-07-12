import { excludeFields } from '@mehrdadhub/common';
import { MESSAGES }      from '@mehrdadhub/locales/en';
import { HashService }                   from '@mehrdadhub/providers';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User }                          from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { RegisterDto }   from './dto/register.dto';

@Injectable()
export class UserService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly hashService: HashService,
	) {}

	public async register(registerDto: RegisterDto) {
		const { email, password, displayName } = registerDto;
		const hashedPassword = await this.hashService.hash(password);

		const newUser = await this.prisma.user.create({
			data: {
				email,
				hashedPassword,
				displayName,
			},
		});

		// Return the new user without the hashed password.
		return excludeFields(newUser, ['hashedPassword']);
	}

	public async findUserByEmail(email: string): Promise<User | null> {
		return this.prisma.user.findUnique({
			where: {
				email,
			},
		});
	}
	
	public async findUserById(userId: number) {
		const user = await this.prisma.user.findUnique({
			where: {
				id:userId,
			},
		});
		if(!user)
			throw new NotFoundException(MESSAGES.COMMON.USER_NOT_FOUND);
		
		return excludeFields(user, ['hashedPassword']);
	}
}
