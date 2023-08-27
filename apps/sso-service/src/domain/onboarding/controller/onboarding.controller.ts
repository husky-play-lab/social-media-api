import { Body, Controller, Patch, Post } from '@nestjs/common';
import { OnboardingService } from '../provider/onboarding.service';
import * as Dto from '../dto';

@Controller('/onboardings')
export class OnboardingController {
  constructor(private onboardingService: OnboardingService) {}

  @Post()
  create(@Body() data: Dto.CreateOnboardingDto) {
    return this.onboardingService.create(data);
  }

  // load workflow instance => change state => save current state database
  @Patch()
  updateById() {}
}
