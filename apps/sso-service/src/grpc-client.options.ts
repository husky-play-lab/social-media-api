import { ClientOptions, Transport } from '@nestjs/microservices';

// import { CASE_PACKAGE_NAME } from './protos/case';
// import { ConfigService } from '@nestjs/config';
import { LOGIN_PACKAGE_NAME } from 'protos/login';

// const configService = new ConfigService();

export function grpcClientOptions(): ClientOptions {
  return {
    transport: Transport.GRPC,
    options: {
      package: [LOGIN_PACKAGE_NAME],
      url: '0.0.0.0:4500',
      protoPath: ['./protos/base.proto', './protos/login.proto'],
    },
  };
}
