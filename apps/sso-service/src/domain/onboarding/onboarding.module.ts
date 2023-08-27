import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { OnboardingController } from './controller/onboarding.controller';
import { OnboardingEntity } from './onboarding.entity';
import { OnboardingService } from './provider/onboarding.service';

@Module({
  imports: [TypeOrmModule.forFeature([OnboardingEntity]), UserModule],
  providers: [OnboardingService],
  controllers: [OnboardingController],
})
export class OnboardingModule {}
