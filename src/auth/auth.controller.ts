import { ResponseMessage }                            from '@mehrdadhub/common';
import { MESSAGES }                                   from '@mehrdadhub/locales/en';
import { Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags }                           from '@nestjs/swagger';
import { User }                                       from '@prisma/client';
import type { Request as ExpressRequest }             from 'express';
import { AuthService }                                from './auth.service';
import { PublicRoute }                                from './decorators';
import { LocalAuthGuard }                             from './guards';
import { LoginDto }                                   from './login.dto';



/**
 * Controller for all authentication and authorization related routes
 */
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	/**
	 * Login route for users
	 * @param request
	 */
	@HttpCode(200)
	@ApiBody({ type: LoginDto })
	@ResponseMessage(MESSAGES.AUTH.LOGIN.SUCCESS)
	@UseGuards(LocalAuthGuard)
	@Post('login')
	@PublicRoute()
	public tempLogin(@Req() request: ExpressRequest & { user: User }) {
		return this.authService.login(request.user);
	}
}
