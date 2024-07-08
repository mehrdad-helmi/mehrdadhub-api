import { Prisma } from '@prisma/client';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import type { Response } from 'express';

/**
 * This is a NestJS exception filter for catching database related errors
 */
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
	catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		switch (exception.code) {
			/**
			 * This case is for trying to add a new record to the database
			 * with redundant value for a unique field
			 */
			case 'P2002': {
				const fieldName = exception.meta!.target![0];
				const errorMessage =
					`The ${fieldName} is already in use. Please choose a different ${fieldName}.`;

				response.status(409).json({
					statusCode: 409,
					message: errorMessage,
					cause: fieldName,
				});
				break;
			}
			case 'P2003': {
				const fieldName = exception.meta!.field_name!;
				const errorMessage = `Something is wrong with this field : ${fieldName}`;

				response.status(400).json({
					statusCode: 409,
					message: errorMessage,
					cause: fieldName,
				});
				break;
			}
			/**
			 * If any exception errors didn't catch it falls here
			 */
			default:
				response.status(400).json({
					statusCode: 400,
					message: 'Something is wrong.',
					cause: exception,
				});
		}
	}
}
