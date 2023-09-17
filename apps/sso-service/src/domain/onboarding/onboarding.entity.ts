import { AbstractEntityIntId } from '@libs/share';
import { EOnboardingState } from '@libs/share/interfaces/sso.interface';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'onboarding',
})
export class OnboardingEntity extends AbstractEntityIntId<OnboardingEntity> {
  @Column({})
  email: string;

  @Column({ default: EOnboardingState.CHECK_ACCOUNT })
  currentState: EOnboardingState;

  // code
}
