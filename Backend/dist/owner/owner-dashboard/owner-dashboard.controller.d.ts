import { OwnerDashboardService } from './owner-dashboard.service';
export declare class OwnerDashboardController {
    private readonly ownerDashboardService;
    constructor(ownerDashboardService: OwnerDashboardService);
    getDashboard(): {
        message: string;
        propertiesOwned: number;
        tenants: number;
    };
}
