import { JwtPayload }                             from '@mehrdadhub/types';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Decorator for extracting jwt payload from request
 * if parameter included it will return just the parameter from payload and
 * if not it will return whole payload
 */
export const Payload = createParamDecorator(
	(key: keyof JwtPayload, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest();
		return key ? request.user[key] : request.user;
	},
);
