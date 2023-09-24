import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { LoginService } from '../provider/login.service';
import * as Dto from '../dto';
import { SerializerInterceptor } from '@libs/share/serialization';

@UseInterceptors(SerializerInterceptor)
@Controller()
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Post('/login')
  login(@Body() data: Dto.LoginDto) {
    return this.loginService.login(data);
  }
}
