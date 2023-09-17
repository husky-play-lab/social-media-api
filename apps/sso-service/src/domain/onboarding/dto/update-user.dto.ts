import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  email: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsOptional()
  lastName: string;
}
