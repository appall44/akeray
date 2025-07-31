import { TenantService } from './tenant.service';
import { SignupDto } from './dto/create-tenant.dto';
export declare class TenantController {
    private readonly tenantService;
    constructor(tenantService: TenantService);
    getAllTenants(): Promise<import("./entities/tenant.entity").Tenant[]>;
    getTenantById(id: number): Promise<import("./entities/tenant.entity").Tenant>;
    updateTenant(id: number, updateData: any): Promise<{
        message: string;
        updated: import("./entities/tenant.entity").Tenant;
    }>;
    deleteTenant(id: number): Promise<{
        message: string;
    }>;
    registerTenant(dto: SignupDto): Promise<{
        message: string;
    }>;
    verifyOtp(body: {
        email: string;
        otp: string;
    }): Promise<{
        message: string;
    }>;
    resendOtp(body?: {
        email?: string;
    }): Promise<{
        message: string;
    }>;
}
