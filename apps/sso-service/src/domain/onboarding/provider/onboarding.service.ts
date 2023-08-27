import { AbstractRepository } from '@libs/share';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OnboardingEntity } from '../onboarding.entity';

@Injectable()
export class OnboardingService extends AbstractRepository<OnboardingEntity> {
  constructor(
    @InjectRepository(OnboardingEntity)
    _repository: Repository<OnboardingEntity>,
  ) {
    super(_repository);
  }
}
