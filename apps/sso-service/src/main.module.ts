import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import datasource, { typeormConfig } from './datasource';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => typeormConfig,
      dataSourceFactory: async () => {
        datasource.initialize();
        return datasource;
      },
    }),
  ],
})
export class MainModule {}
