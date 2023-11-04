import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  LoginPayload,
  LoginServiceClient,
  LOGIN_SERVICE_NAME,
} from 'protos/login';

@Controller('/login')
export class LoginController {
  private loginService: LoginServiceClient;

  constructor(@Inject('SSO_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.loginService =
      this.client.getService<LoginServiceClient>(LOGIN_SERVICE_NAME);
  }

  @Post()
  login(@Body() request: LoginPayload) {
    return this.loginService.login(request);
  }
}
