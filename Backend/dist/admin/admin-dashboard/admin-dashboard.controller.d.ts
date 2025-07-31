import { AdminDashboardService } from './admin-dashboard.service';
export declare class AdminDashboardController {
    private readonly adminDashboardService;
    constructor(adminDashboardService: AdminDashboardService);
    getDashboard(): {
        message: string;
        usersCount: number;
        propertiesManaged: number;
    };
}
