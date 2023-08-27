import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateOnboardingDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
