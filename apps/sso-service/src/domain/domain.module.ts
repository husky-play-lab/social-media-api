import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { OnboardingModule } from './onboarding/onboarding.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, OnboardingModule, LoginModule],
})
export class DomainModule {}
