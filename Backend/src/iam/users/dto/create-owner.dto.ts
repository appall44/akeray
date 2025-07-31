import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateOwnerDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsString()
  firstname?: string;

  @IsString()
  lastname?: string;
}
