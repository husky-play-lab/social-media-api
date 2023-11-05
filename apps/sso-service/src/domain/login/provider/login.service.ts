import { AbstractRepository } from '@libs/share';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../../user/provider/user.service';
import { LoginEntity } from '../login.entity';
import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import * as Dto from '../dto/login.dto';
import { RpcException } from '@nestjs/microservices';
import * as grpc from '@grpc/grpc-js';

@Injectable()
export class LoginService extends AbstractRepository<LoginEntity> {
  constructor(
    @InjectRepository(LoginEntity) _repository: Repository<LoginEntity>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {
    super(_repository);
  }

  async login(data: Dto.LoginDto) {
    // console.log(data);

    const { email, password } = data;
    const user = await this.userService.findByEmail(email);
    if (!user)
      throw new RpcException({
        code: grpc.status.UNAUTHENTICATED,
        message: 'Invalid credentials!',
      });

    // compare password
    const isMatched = bcrypt.compare(password, user.password);
    if (!isMatched)
      throw new RpcException({
        code: grpc.status.UNAUTHENTICATED,
        message: 'Invalid credentials!',
      });

    // create jwt
    const payload = {
      iss: process.env.SSO_API_HOST,
      sub: user.email,
      type: 'auth',
      userId: user.id,
    };
    const jwt = await this.jwtService.signAsync(payload);
    return await this.create({
      userId: user.id,
      jwt,
    });
  }
}
