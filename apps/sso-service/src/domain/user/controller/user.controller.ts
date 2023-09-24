import { SerializerInterceptor } from '@libs/share/serialization';
import {
  Controller,
  Get,
  UseGuards,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from 'apps/sso-service/src/guard/auth.guard';
import { UserService } from '../provider/user.service';

@UseInterceptors(SerializerInterceptor)
@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('/me')
  getMe(@Request() req: Request) {
    return req['user'];
  }
}
