import { Injectable } from '@nestjs/common';

@Injectable()
export class BffServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
