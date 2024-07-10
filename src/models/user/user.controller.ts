import { Payload, PublicRoute } from '@mehrdadhub/auth';
import { ResponseMessage }      from '@mehrdadhub/common';
import { MESSAGES }                           from '@mehrdadhub/locales/en';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RegisterDto }            from './dto/register.dto';
import { UserService }            from './user.service';

@ApiTags('User')
@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post('register')
	@ResponseMessage(MESSAGES.USER.SUCCESSFUL_SIGNUP)
	@PublicRoute()
	public async register(@Body() registerDto: RegisterDto) {
		return this.userService.register(registerDto);
	}
	
	@Get('me')
	@ApiBearerAuth()
	public async getUser(
		@Payload('userId') userId: number,
	){
		return this.userService.findUserById(userId)
	}
}
