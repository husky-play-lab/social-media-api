import { Controller, UseInterceptors } from '@nestjs/common';
import { LoginService } from '../provider/login.service';
// import * as Dto from '../dto';
import { SerializerInterceptor } from '@libs/share/serialization';
import {
  LoginPayload,
  LoginServiceController,
  LoginServiceControllerMethods,
} from 'protos/login';
import { Metadata } from '@grpc/grpc-js';
// import { Observable } from 'rxjs';

// @UseInterceptors(SerializerInterceptor)
@LoginServiceControllerMethods()
@Controller()
export class LoginController implements LoginServiceController {
  constructor(private loginService: LoginService) {}

  async login(
    request: LoginPayload,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metadata?: Metadata,
  ) {
    const res = await this.loginService.login(request);
    console.log(res);

    return res;
  }

  // @Post('/login')
  // login(@Body() data: Dto.LoginDto) {
  //   return this.loginService.login(data);
  // }
}
