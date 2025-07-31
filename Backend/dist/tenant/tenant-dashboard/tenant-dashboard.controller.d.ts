import { TenantDashboardService } from './tenant-dashboard.service';
export declare class TenantDashboardController {
    private readonly tenantDashboardService;
    constructor(tenantDashboardService: TenantDashboardService);
    getDashboard(): {
        message: string;
        activeRentals: number;
        maintenanceRequests: number;
    };
}
