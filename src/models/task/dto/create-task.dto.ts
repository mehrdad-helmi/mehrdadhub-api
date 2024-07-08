import { ApiProperty }                      from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';



export class CreateTaskDto {
	@ApiProperty({
		example:"My special task",
		description:"A proper name for the task",
		default:"New Task",
		required:true,
	})
	@IsString()
	@IsNotEmpty()
	title:string;
	
	@ApiProperty({
		example:"This is some description about my task",
		description:"A proper description for the task",
		required:false,
	})
	@IsString()
	@IsOptional()
	description?:string;
	
	@ApiProperty({
		example:"blue",
		description:"Color of the task card in UI (any proper CSS color format)",
		required:false,
	})
	@IsString()
	@IsOptional()
	color?:string;
}
