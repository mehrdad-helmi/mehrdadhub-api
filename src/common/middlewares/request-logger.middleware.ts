import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import * as winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const logDirectory = 'logs';

/**
 * A middleware that logs incoming requests and errors to a file and the console.
 */
@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
	private logger: winston.Logger;

	private errorLogger: winston.Logger;

	/**
	 * Creates a new instance of the middleware.
	 */
	constructor() {
		const logFormat = winston.format.printf(({ message }) => message);

		const loggerOptions = {
			filename: 'requests-%DATE%.log',
			dirname: `${logDirectory}/requests`,
			datePattern: 'YYYY-MM-DD',
			maxSize: '20m',
			maxFiles: '14d',
		};
		const errorLoggerOptions = {
			...loggerOptions,
			level: 'error',
			filename: 'error-%DATE%.log',
			dirname: `${logDirectory}/errors`,
			maxFiles: '30d',
		};

		const transportArray: any[] = [new DailyRotateFile(loggerOptions)];

		if (process.env.NODE_ENV !== 'production')
			transportArray.push(new winston.transports.Console());

		// Setup request logger
		this.logger = winston.createLogger({
			format: logFormat,
			transports: transportArray,
		});

		// Setup error logger
		this.errorLogger = winston.createLogger({
			level: 'error',
			format: logFormat,
			transports: [
				new winston.transports.Console(),
				new DailyRotateFile(errorLoggerOptions),
			],
		});
	}

	/**
	 * Logs the request and error information.
	 * @param req The incoming request.
	 * @param res The outgoing response.
	 * @param next The next middleware function.
	 */
	use(req: Request, res: Response, next: NextFunction): void {
		const morganMessage =
			'[:date[iso]] ' +
			'[:method] :url [:status] :total-time ms ' +
			'| :user-agent [:remote-addr] ';

		morgan(morganMessage, {
			stream: {
				write: (message: string) => {
					if (
						process.env.NODE_ENV === 'production' &&
						req.url.endsWith('connection-test')
					)
						return;
					if (res.statusCode >= 400) this.errorLogger.error(message.trim());
					else this.logger.info(message.trim());
				},
			},
		})(req, res, () => {});

		next();
	}
}
