import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { ConfigService }                                              from '@nestjs/config';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class VersionHeaderInterceptor implements NestInterceptor {
	constructor(private readonly configService: ConfigService) {}
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(
			tap(() => {
				const ctx = context.switchToHttp();
				const response = ctx.getResponse();
				response.setHeader('X-API-Version', this.configService.get('minorVersion'));
			}),
		);
	}
}
