import { attachSwagger, PrismaExceptionFilter } from '@mehrdadhub/common';
import { INestApplication, ValidationPipe }     from '@nestjs/common';
import { ConfigService }                    from '@nestjs/config';
import { NestFactory }      from '@nestjs/core';
import helmet                                   from 'helmet';
import { AppModule }        from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<INestApplication>(AppModule, {
    logger:
      process.env.NODE_ENV === 'production'
      ? ['error']
      : ['fatal', 'error', 'warn', 'debug'],
    
  });
  
  /**
   * Getting application's configurations
   */
  const configService = app.get(ConfigService);
  
  /**
   * Attach swagger documentation service to the application
   */
  attachSwagger(
    app,
    configService.get('minorVersion')!,
    configService.get('majorVersion')!,
  );
  
  /**
   * Set a port to serve the application
   */
  const appPort = configService.get('PORT');
  
  /**
   * Set application's current version as endpoint's prefix example:/v1
   */
  const currentVersionPrefix = `v${configService.get('majorVersion')}`;
  app.setGlobalPrefix(currentVersionPrefix);
  
  /**
   * Binding global database exception filter
   */
  app.useGlobalFilters(new PrismaExceptionFilter());
  
  /**
   * Validation pipes for class-validator and class-transformer
   * TODO: add validation decorators to all dto
   */
  app.useGlobalPipes(
    new ValidationPipe({
      // Only whitelist in production
      // whitelist: process.env.NODE_ENV === 'production',
    }),
  );
  
  /**
   * Set CORS policy for the application
   * TODO: Add frontend origin and secure CORS policy
   */
  app.enableCors({
    origin: '*', // Frontend origin
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
  });
  
  app.use(helmet())
  
  /**
   * Start listening to server
   * Real magic starts from here :)
   */
  await app.listen(appPort);
  
  console.log(
    ` ✅  Application is running on localhost:${appPort}/${currentVersionPrefix}`,
  );
}

void bootstrap().then(() => console.log(` 📅  Server start time : ${new Date()}`));
