import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { validate } from './config';
// import datasource, { typeormConfig } from './datasource';
// import { DomainModule } from './domain/domain.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    // TypeOrmModule.forRootAsync({
    //   useFactory: () => typeormConfig,
    //   dataSourceFactory: async () => {
    //     datasource.initialize();
    //     return datasource;
    //   },
    // }),
    // DomainModule,
  ],
})
export class MainModule {}
