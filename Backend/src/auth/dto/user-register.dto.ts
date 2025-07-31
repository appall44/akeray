import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignupDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsString()
  idNumber: string;

  @IsString()
  phone: string;

  @IsString()
  occupation: string;
}
