/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "login";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface Login {
  id: string;
  userId: string;
  jwt: string;
}

export const LOGIN_PACKAGE_NAME = "login";

export interface LoginServiceClient {
  login(request: LoginPayload, metadata?: Metadata): Observable<Login>;
}

export interface LoginServiceController {
  login(request: LoginPayload, metadata?: Metadata): Promise<Login> | Observable<Login> | Login;
}

export function LoginServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["login"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("LoginService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("LoginService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const LOGIN_SERVICE_NAME = "LoginService";
