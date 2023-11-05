import { Status } from '@grpc/grpc-js/build/src/constants';
import {
  Catch,
  HttpException,
  HttpStatus,
  RpcExceptionFilter,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { throwError } from 'rxjs';

@Catch()
export class RpcExceptionsFilter implements RpcExceptionFilter<any> {
  catch(exception: HttpException | RpcException) {
    let gRPCException: RpcException = new RpcException({
      code: Status.UNKNOWN,
      message: 'Unknown Error',
    });

    if (exception instanceof RpcException) gRPCException = exception;

    if (exception instanceof HttpException) {
      gRPCException = new RpcException({
        code: this.errorCodeMapping(exception.getStatus()),
        message: exception.message,
      });
    }
    return throwError(() => gRPCException.getError());
  }

  private errorCodeMapping(statusCode: HttpStatus): Status {
    switch (statusCode) {
      case HttpStatus.BAD_REQUEST:
        return Status.INVALID_ARGUMENT;
      case HttpStatus.UNAUTHORIZED:
        return Status.UNAUTHENTICATED;
      case HttpStatus.FORBIDDEN:
        return Status.PERMISSION_DENIED;
      case HttpStatus.NOT_FOUND:
        return Status.NOT_FOUND;
      case HttpStatus.CONFLICT:
        return Status.ALREADY_EXISTS;
      case HttpStatus.TOO_MANY_REQUESTS:
        return Status.RESOURCE_EXHAUSTED;
      case HttpStatus.GATEWAY_TIMEOUT:
        return Status.DEADLINE_EXCEEDED;
      case HttpStatus.NOT_IMPLEMENTED:
        return Status.UNIMPLEMENTED;
      case HttpStatus.BAD_GATEWAY:
      case HttpStatus.SERVICE_UNAVAILABLE:
        return Status.UNAVAILABLE;
      case HttpStatus.INTERNAL_SERVER_ERROR:
        return Status.INTERNAL;
      default:
        return Status.UNKNOWN;
    }
  }
}
