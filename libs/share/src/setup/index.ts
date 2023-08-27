import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ValidationError } from 'class-validator';
import { AllExceptionsFilter } from '../exception/all-exceptions.filter';
import _ from 'lodash';

export interface IApplicationOptions {
  globalPrefix: string;
}

const setUpApplication = (
  app: INestApplication,
  options?: IApplicationOptions,
) => {
  app.setGlobalPrefix(options?.globalPrefix || 'api');

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: [
      'Content-Type',
      'Accept',
      'Authorization',
      'X-Requested-With',
    ],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(validationErrors);
      },
      validationError: {
        target: false,
      },
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  const configService = app.get(ConfigService);
  const port = _.parseInt(configService.get('PORT'), 10);
  const appName = configService.get('SERVICE_NAME');

  return {
    port,
    appName,
    logInfo: () => console.table({ port, appName }),
  };
};

export default setUpApplication;
