import { Controller, UseFilters } from '@nestjs/common';
import { LoginService } from '../provider/login.service';
// import * as Dto from '../dto';
import {
  LoginPayload,
  LoginServiceController,
  LoginServiceControllerMethods,
} from 'protos/login';
import { Metadata } from '@grpc/grpc-js';
import { RpcExceptionsFilter } from '@libs/share/exception/rpc-exception.filter';
// import { Observable } from 'rxjs';

// @UseInterceptors(SerializerInterceptor)
@LoginServiceControllerMethods()
@UseFilters(new RpcExceptionsFilter())
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
