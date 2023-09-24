import { AbstractRepository } from '@libs/share';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user.entity';

@Injectable()
export class UserService extends AbstractRepository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity) _repository: Repository<UserEntity>,
  ) {
    super(_repository);
  }

  findByEmail(email: string) {
    return this._repository.findOne({ where: { email } });
  }

  async createUserWithEmail(data) {
    const { email, password } = data;

    const foundUser = await this.findByEmail(email);
    if (foundUser) throw new BadRequestException('User exist');
    return this.create({ email, password });
  }
}
