import { IsEmail, IsString, MinLength, IsOptional, IsBoolean } from 'class-validator';

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

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsBoolean()
  verified?: boolean;

  @IsOptional()
  @IsString()
  ean?: string;
}
