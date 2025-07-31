import { Controller, Post, Body, ForbiddenException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

class AdminSignupDto {
  email: string;
  password: string;
}

class AdminLoginDto {
  email: string;
  password: string;
}

@Controller('admin')
export class AdminController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: AdminSignupDto) {
    const { email, password } = dto;
    try {
      return await this.authService.signupAdmin(email, password);
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  @Post('login')
  async login(@Body() dto: AdminLoginDto) {
    const { email, password } = dto;
    try {
      return await this.authService.loginAdmin(email, password);
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
