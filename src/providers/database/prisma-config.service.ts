import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';
import { PrismaOptionsFactory, PrismaServiceOptions } from 'nestjs-prisma';

@Injectable()
export class PrismaConfigService implements PrismaOptionsFactory {
	constructor(private readonly configService: ConfigService) {}

	createPrismaOptions(): PrismaServiceOptions | Promise<PrismaServiceOptions> {
		return {
			prismaOptions: {
				log: this.configService.get<Prisma.LogDefinition[]>(
					'prismaConfig.logLevel',
				),
				errorFormat: this.configService.get<Prisma.ErrorFormat>(
					'prismaConfig.errorFormat',
				),
			},
			explicitConnect: this.configService.get<boolean>(
				'prismaConfig.explicitConnect',
			),
		};
	}
}
