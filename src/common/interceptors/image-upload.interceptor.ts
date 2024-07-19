import { BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

// Function to create and return FileInterceptor
export function imageUploadInterceptor() {
	return FileInterceptor('file', {
		storage: memoryStorage(),
		fileFilter: (_req, file, callback) => {
			if (!file.originalname.match(/\.(jpg|jpeg|png)$/))
				// Reject file if it's not jpg/jpeg/png
				return callback(
					new BadRequestException(
						'Only .png, .jpg and .jpeg formats are allowed!',
					),
					false,
				);

			callback(null, true);
		},
		limits: {
			fileSize: 6 * 1024 * 1024, // 6MB
		},
	});
}
