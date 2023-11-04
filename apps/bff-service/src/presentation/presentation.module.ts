import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LOGIN_PACKAGE_NAME } from 'protos/login';
import { LoginController } from './login.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SSO_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:4500',
          package: LOGIN_PACKAGE_NAME,
          protoPath: ['./protos/base.proto', './protos/login.proto'],
        },
      },
    ]),
  ],
  controllers: [LoginController],
})
export class PresentationModule {}
