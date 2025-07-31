import { Injectable } from '@nestjs/common';

@Injectable()
export class TenantDashboardService {
  getTenantStats() {
    return {
      message: 'Welcome to Tenant Dashboard',
      activeRentals: 2,
      maintenanceRequests: 1,
    };
  }
}
