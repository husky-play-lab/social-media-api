import { EOnboardingState } from '@libs/share/interfaces/sso.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OnboardingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cuurentState: EOnboardingState;
}
