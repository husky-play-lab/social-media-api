import { AbstractRepository } from '@libs/share';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OnboardingEntity } from '../onboarding.entity';
import * as Dto from '../dto';
import { onboardingMachine } from '../onboarding.workflow';
import { interpret } from 'xstate';
import { UserService } from '../../user/user.service';
import { EOnboardingState } from '@libs/share/interfaces/sso.interface';

@Injectable()
export class OnboardingService extends AbstractRepository<OnboardingEntity> {
  constructor(
    @InjectRepository(OnboardingEntity)
    _repository: Repository<OnboardingEntity>,
    private userService: UserService,
  ) {
    super(_repository);
  }

  async initWorkflow(data: Dto.CreateOnboardingDto) {
    const { email } = data;

    const onboarding = await this.create({ email });

    const workflow = interpret(onboardingMachine)
      .onTransition(async (state) => {
        onboarding.currentState = state.value as EOnboardingState;
        await onboarding.save();
      })
      .start();

    const foundUser = this.userService.findByEmail(email);

    workflow.send({
      type: 'check_account',
      query: { isEmailExist: foundUser ? false : true },
    });

    return onboarding;
  }
}
