import { AuthService } from './auth.service';
import { AdminService } from '../admin/admin.services';
import { OwnerService } from '../owner/owner.service';
import { TenantService } from '../tenant/tenant.service';
import { CreateOwnerDto } from '../owner/dto/create-owner.dto';
import { Request } from 'express';
export declare class AuthController {
    private readonly authService;
    private readonly adminService;
    private readonly ownerService;
    private readonly tenantService;
    constructor(authService: AuthService, adminService: AdminService, ownerService: OwnerService, tenantService: TenantService);
    getProfile(req: Request): Promise<import("../admin/entities/admin.entity").Admin | import("../owner/entities/owner.entity").Owner | import("../tenant/entities/tenant.entity").Tenant | null>;
    signupAdmin(dto: {
        email: string;
        password: string;
    }): Promise<{
        role: string;
        accessToken: string;
        refreshToken: string;
        message: string;
    }>;
    registerOwner(dto: CreateOwnerDto, file: Express.Multer.File): Promise<{
        message: string;
        owner: import("../owner/entities/owner.entity").Owner;
    }>;
    signupTenant(dto: {
        email: string;
        password: string;
        firstName?: string;
        lastName?: string;
        idNumber?: string;
        phone?: string;
        occupation?: string;
    }): Promise<{
        role: string;
        accessToken: string;
        refreshToken: string;
        message: string;
    }>;
    loginAdmin(dto: {
        email: string;
        password: string;
    }): Promise<{
        role: string;
        accessToken: string;
        refreshToken: string;
        message: string;
    }>;
    loginOwner(dto: {
        email: string;
        password: string;
    }): Promise<{
        role: string;
        accessToken: string;
        refreshToken: string;
        message: string;
    }>;
    loginTenant(dto: {
        email: string;
        password: string;
    }): Promise<{
        role: string;
        accessToken: string;
        refreshToken: string;
        message: string;
    }>;
}
