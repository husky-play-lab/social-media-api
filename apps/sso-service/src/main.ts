import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);

  console.log('runnnnn');

  await app.listen(7001);
}

bootstrap();
