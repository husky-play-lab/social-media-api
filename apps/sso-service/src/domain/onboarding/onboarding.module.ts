import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OnboardingController } from './controller/onboarding.controller';
import { OnboardingEntity } from './onboarding.entity';
import { OnboardingService } from './provider/onboarding.service';

@Module({
  imports: [TypeOrmModule.forFeature([OnboardingEntity])],
  providers: [OnboardingService],
  controllers: [OnboardingController],
})
export class OnboardingModule {}
