import { Controller, Get, UseGuards } from '@nestjs/common';
import { OwnerDashboardService } from './owner-dashboard.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../shared/decorators/roles.decorator';

@Controller('owner/dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('owner')
export class OwnerDashboardController {
  constructor(private readonly ownerDashboardService: OwnerDashboardService) {}

  @Get()
  getDashboard() {
    return this.ownerDashboardService.getOwnerStats();
  }
}
