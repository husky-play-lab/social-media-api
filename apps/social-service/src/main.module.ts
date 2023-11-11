import { Module } from '@nestjs/common';
import { PresentationModule } from './presentation';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import datasource, {
  typeormConfig,
} from './infrastructure/database/datasource';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),

    TypeOrmModule.forRootAsync({
      useFactory: () => typeormConfig,
      dataSourceFactory: async () => {
        datasource.initialize();
        return datasource;
      },
    }),

    // Import the PresentationModule
    PresentationModule,
  ],
})
export class MainModule {}
