import {
	RequestLoggerMiddleware,
	ResponseTransformInterceptor,
} from '@mehrdadhub/common';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule }        from '@nestjs/throttler';
import { APP_GUARD, APP_INTERCEPTOR }             from '@nestjs/core';
import { AppController }              from './app.controller';
import { AppService }      from './app.service';
import { AuthModule } from './auth/auth.module';
import { AppConfigModule } from './config';
import { ModelsModule }    from './models/models.module';
import { ProvidersModule } from './providers/providers.module';

@Module({
	imports: [
		AppConfigModule,
		AuthModule,
		ProvidersModule,
		ModelsModule,
		ThrottlerModule.forRoot([
			{
				name: 'short',
				ttl: 1000,
				limit: 3,
			},
			{
				name: 'medium',
				ttl: 10000,
				limit: 20
			},
			{
				name: 'long',
				ttl: 60000,
				limit: 100
			}
		]),
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_INTERCEPTOR,
			useClass: ResponseTransformInterceptor,
		},
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard
		}
	
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(RequestLoggerMiddleware).forRoutes('*');
	}
}
