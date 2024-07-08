import sharp from 'sharp';

/**
 * Resizes an image to a square of 512x512 pixels, or to the
 * smallest dimension if it's less than 512 pixels.
 * @param {string} inputPath - Path to the input image file.
 * @param {number} sizeInPx - The size in pixels to resize the image to.
 */
export const resizeImageToSquareJpeg = async (
	inputPath: Buffer,
	sizeInPx: number,
	quality: number,
): Promise<Buffer> => {
	try {
		// Read the image using Sharp
		const image = sharp(inputPath);

		// Get metadata of the image
		const metadata = await image.metadata();

		if (!metadata.width || !metadata.height) throw new Error('Invalid image');

		if (metadata.width < sizeInPx || metadata.height < sizeInPx) {
			// If either dimension is less than sizeInPx, resize to the smallest dimension
			const minDimension = Math.min(metadata.width, metadata.height);
			image.resize({ width: minDimension, height: minDimension, fit: 'cover' });
		}
		// Resize the image
		else image.resize({ width: sizeInPx, height: sizeInPx, fit: 'cover' });

		return await image.jpeg({ quality }).toBuffer();
	} catch (error) {
		throw new Error(
			'Could not process the provided image, please try again later.',
		);
	}
};

/**
 * Resizes an image by its width, or to the
 * smallest dimension if it's less than x pixels.
 * @param {string} inputPath - Path to the input image file.
 * @param {number} sizeInPx - The size in pixels to resize the image to.
 */
export const resizeImageWidth = async (
	inputPath: Buffer,
	sizeInPx: number,
	quality: number,
): Promise<Buffer> => {
	try {
		// Read the image using Sharp
		const image = sharp(inputPath);

		// Get metadata of the image
		const metadata = await image.metadata();

		if (!metadata.width || !metadata.height) throw new Error('Invalid image');

		if (metadata.width < sizeInPx) {
			// If either dimension is less than sizeInPx, resize to the smallest dimension
			const minDimension = Math.min(metadata.width, sizeInPx);
			image.resize({ width: minDimension });
		}
		// Resize the image
		else image.resize({ width: sizeInPx });

		return await image.jpeg({ quality }).toBuffer();
	} catch (error) {
		throw new Error(
			'Could not process the provided image, please try again later.',
		);
	}
};
