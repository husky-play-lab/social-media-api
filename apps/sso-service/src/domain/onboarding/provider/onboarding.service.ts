import { AbstractRepository } from '@libs/share';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OnboardingEntity } from '../onboarding.entity';
import * as Dto from '../dto';
import { onboardingMachine } from '../onboarding.workflow';
import { interpret } from 'xstate';
import { UserService } from '../../user/provider/user.service';
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

    const foundUser = await this.userService.findByEmail(email);

    workflow.send({
      type: 'check_account',
      query: {
        isEmailExist: foundUser ? false : true,
        email,
      },
    });

    return onboarding;
  }

  async findLatestOnboarding(data) {
    const { email } = data;
    return this._repository.findOne({
      where: { email },
      order: { createdAt: 'DESC' },
    });
  }

  async createUser(data: Dto.CreateUserDto) {
    const { email } = data;

    const onboarding = await this.findLatestOnboarding({ email });

    const workflow = interpret(onboardingMachine)
      .onTransition(async (state) => {
        onboarding.currentState = state.value as EOnboardingState;
        await onboarding.save();
      })
      .start(onboarding.currentState);

    const user = await this.userService.createUserWithEmail(data);

    workflow.send({
      type: 'verify',
      query: {
        verifyWithin3Days: true,
      },
    });

    workflow.send({
      type: 'filling_password',
    });

    return user;
  }

  async updateUser(data: Dto.UpdateUserDto) {
    const { email, firstName, lastName } = data;
    const onboarding = await this.findLatestOnboarding({ email });

    const workflow = interpret(onboardingMachine)
      .onTransition(async (state) => {
        onboarding.currentState = state.value as EOnboardingState;
        await onboarding.save();
      })
      .start(onboarding.currentState);

    let user = await this.userService.findByEmail(email);
    user = await this.userService.updateById(user.id, {
      firstName,
      lastName,
    });

    workflow.send({
      type: 'filling_profile',
    });

    return user;
  }
}
