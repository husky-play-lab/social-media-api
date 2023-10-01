import setUpApplication from '@libs/share/setup';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { grpcClientOptions } from './grpc-client.options';
import { MainModule } from './main.module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);

  app.connectMicroservice<MicroserviceOptions>(grpcClientOptions());
  await app.startAllMicroservices();

  const { logInfo } = setUpApplication(app);
  await app.listen(process.env.PORT);

  logInfo();
}

bootstrap();
