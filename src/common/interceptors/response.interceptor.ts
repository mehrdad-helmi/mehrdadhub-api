import { MESSAGES }        from '@mehrdadhub/locales/en';
import { SuccessResponse } from '@mehrdadhub/types';
import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
}                          from '@nestjs/common';
import { Reflector }       from '@nestjs/core';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseTransformInterceptor<T>
	implements NestInterceptor<T, SuccessResponse<T>>
{
	constructor(private reflector: Reflector) {}

	intercept(
		context: ExecutionContext,
		next: CallHandler,
	): Observable<SuccessResponse<T>> {
		return next.handle().pipe(
			map((data) => {
				const response = context.switchToHttp().getResponse();
				const defaultMsg = MESSAGES.COMMON.SUCCESS_GET;
				const message =
					this.reflector.get<string>('responseMessage', context.getHandler()) ||
					defaultMsg;
				const { statusCode } = response;
				return { statusCode, message, data };
			}),
		);
	}
}
