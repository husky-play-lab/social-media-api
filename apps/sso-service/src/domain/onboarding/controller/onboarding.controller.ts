import { Body, Controller, Patch, Post, UseInterceptors } from '@nestjs/common';
import { OnboardingService } from '../provider/onboarding.service';
import * as Dto from '../dto';
import { SerializerInterceptor } from '@libs/share/serialization';

@UseInterceptors(SerializerInterceptor)
@Controller('/onboardings')
export class OnboardingController {
  constructor(private onboardingService: OnboardingService) {}

  @Post()
  initWorkflow(@Body() data: Dto.CreateOnboardingDto) {
    return this.onboardingService.initWorkflow(data);
  }

  @Post('/create-user')
  createAccount(@Body() data: Dto.CreateUserDto) {
    return this.onboardingService.createUser(data);
  }

  @Patch('/update-user')
  updateUser(@Body() data: Dto.UpdateUserDto) {
    return this.onboardingService.updateUser(data);
  }
}
