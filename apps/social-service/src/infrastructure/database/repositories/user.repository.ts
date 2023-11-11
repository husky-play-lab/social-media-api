import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractRepository } from '@libs/share/database/sql';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository extends AbstractRepository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity) _repository: Repository<UserEntity>,
  ) {
    super(_repository);
  }
}
