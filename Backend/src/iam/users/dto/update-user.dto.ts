import { IsEmail, IsOptional, IsString, IsIn } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  firstname?: string;

  @IsOptional()
  @IsString()
  lastname?: string;

  @IsOptional()
  @IsIn(['admin', 'tenant', 'owner']) // allowed roles
  role?: 'admin' | 'tenant' | 'owner';
}
