import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

export interface CreateUserDto {
  email: string;
  password: string;
}

export const IUserService = Symbol.for('IUserService');
export interface IUserService {
  create(data: CreateUserDto): Promise<UserEntity>;
}

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(UserEntity) private repository: Repository<UserEntity>,
  ) {}

  create(data: CreateUserDto): Promise<UserEntity> {
    return this.repository.create(data).save();
  }
}
