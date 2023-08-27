import _ from 'lodash';
import dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import path from 'path';
import { envPath } from '../config';
import { SnakeNamingStrategy } from '@libs/share/database';

dotenv.config({ path: envPath });
if (!process.env.APP_NAME) {
  const migrationEnvPath = path.join(__dirname + `/../../.env`);
  dotenv.config({ path: migrationEnvPath });
}

const configService = new ConfigService({});

console.log(__dirname);

export const typeormConfig: DataSourceOptions & TypeOrmModuleOptions = {
  entities: [__dirname + '/../domain/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: _.parseInt(configService.get('DB_PORT'), 10),
  username: configService.get('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  migrationsRun: false,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
  migrationsTransactionMode: 'each',
  synchronize: false,
};

const datasource = new DataSource(typeormConfig);

// migration

export default datasource;
