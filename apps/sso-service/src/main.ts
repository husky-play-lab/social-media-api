import setUpApplication from '@libs/share/setup';
import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  const { logInfo } = setUpApplication(app);
  await app.listen(process.env.PORT);

  logInfo();
}

bootstrap();
