import { Module } from '@nestjs/common';
import { PrismaModule as NestJsPrismaModule } from 'nestjs-prisma';
import { PrismaConfigService } from './prisma-config.service';

@Module({
	imports: [
		NestJsPrismaModule.forRootAsync({
			isGlobal: true,
			useClass: PrismaConfigService,
		}),
	],
})
export class PrismaModule {}
