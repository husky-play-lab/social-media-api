import { Body, Controller, Patch, Post, UseInterceptors } from '@nestjs/common';
import { OnboardingService } from '../provider/onboarding.service';
import * as Dto from '../dto';
import { SerializerInterceptor } from '@libs/share/serialization';

@Controller('/onboardings')
export class OnboardingController {
  constructor(private onboardingService: OnboardingService) {}

  @UseInterceptors(SerializerInterceptor)
  @Post()
  create(@Body() data: Dto.CreateOnboardingDto) {
    return this.onboardingService.initWorkflow(data);
  }

  // load workflow instance => change state => save current state database
  @Patch()
  updateById() {}
}
