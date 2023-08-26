import { Controller, Patch, Post } from '@nestjs/common';
import { OnboardingService } from '../provider/onboarding.service';

@Controller()
export class OnboardingController {
  constructor(private onboardingService: OnboardingService) {}

  // init onboarding workflow instance
  // save database: id, current state CHECK_ACCOUNT
  @Post()
  create() {}

  // load workflow instance => change state => save current state database
  @Patch()
  updateById() {}
}
