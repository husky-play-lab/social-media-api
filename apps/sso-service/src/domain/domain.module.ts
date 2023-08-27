import { Module } from '@nestjs/common';
import { OnboardingModule } from './onboarding/onboarding.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, OnboardingModule],
})
export class DomainModule {}
