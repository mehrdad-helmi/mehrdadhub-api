import { Global, Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma.module';
import { HashModule } from './hash/hash.module';

@Global()
@Module({
	imports: [
		PrismaModule,
		HashModule,
	],
	exports: [
		PrismaModule,
		HashModule,
	],
})
export class ProvidersModule {}
