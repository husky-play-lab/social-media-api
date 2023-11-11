import { Module } from '@nestjs/common';
import { PresentationModule } from './presentation';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),

    // Import the PresentationModule
    PresentationModule,
  ],
})
export class MainModule {}
