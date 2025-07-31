import { Controller, Get, UseGuards } from '@nestjs/common';
import { TenantDashboardService } from './tenant-dashboard.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../shared/decorators/roles.decorator';


@Controller('tenant/dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('tenant')
export class TenantDashboardController {
  constructor(private readonly tenantDashboardService: TenantDashboardService) {}

  @Get()
  getDashboard() {
    return this.tenantDashboardService.getTenantStats();
  }
}
