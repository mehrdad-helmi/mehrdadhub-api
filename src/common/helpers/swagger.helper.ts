import {
	DocumentBuilder,
	SwaggerDocumentOptions,
	SwaggerModule,
} from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import * as fs from 'fs/promises';

/**
 * This method sets necessary Swagger's configs
 * @param minorVersion
 * @param majorVersion
 */
function swaggerConfig(minorVersion: string, majorVersion: string) {
	// TODO: get these configs from the config folder
	return new DocumentBuilder()
		.setTitle('MehrdadHub API')
		.setDescription('This is documentation for MehrdadHub rest API service')
		.setVersion(minorVersion || 'api version not provided!')
		.addServer(`http://localhost:5050/v${majorVersion}`)
		.addBearerAuth()
		.build();
}

function swaggerOptions(): SwaggerDocumentOptions {
	return {
		operationIdFactory: (_controllerKey: string, methodKey: string) =>
			methodKey,
		ignoreGlobalPrefix: true,
	};
}

/**
 * This method attaches Swagger to the INestApplication
 * then will create a OpenAPI standard file and writes generated documents on it
 * So developers can use this file in wherever
 * that supports OpenApi standard like Postman
 * @param app
 * @param minorVersion
 * @param majorVersion
 */
export function attachSwagger(
	app: INestApplication,
	minorVersion: string,
	majorVersion: string,
) {
	const document = SwaggerModule.createDocument(
		app,
		swaggerConfig(minorVersion, majorVersion),
		swaggerOptions(),
	);
	SwaggerModule.setup('documentation', app, document);
	const docFileName = `./mehrdadhub-openapi-v${majorVersion}.json`;
	fs.writeFile(docFileName, JSON.stringify(document, null, '\t')).then(()=>{
		console.info(` ✅  OpenApi document file created [${docFileName}]`);
	}).catch(err=>console.error(err));
}
