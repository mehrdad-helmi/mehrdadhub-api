import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';

@Module({
	imports: [
		UserModule,
		TaskModule
	],
	exports: [
		UserModule
	],
})
export class ModelsModule {}
