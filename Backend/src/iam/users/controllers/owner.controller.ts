import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { UserRole } from '../enums/user-role.enum';

@Controller('ownerDashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.OWNER)
export class OwnerController {
  @Get()
  getOwnerDashboard() {
    return {
      message: 'Welcome to the Owner Dashboard!',
    };
  }
}
