import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';

export class ChangeImageDto {
	@ApiProperty({
		required: true,
		description: 'Url of the uploaded image',
	})
	@IsUrl()
	imgUrl: string;
}
