import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors();
  app.setGlobalPrefix('api');

  const logger = new Logger('Bootstrap');

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  await app.listen(port, '0.0.0.0', () => {
    logger.log(`App running on http://localhost:${port}`);
  });
}

bootstrap();
