import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admin/admin.services';
import { OwnerService } from '../owner/owner.service';
import { TenantService } from '../tenant/tenant.service';
import { CreateOwnerDto } from '../owner/dto/create-owner.dto';
export declare class AuthService {
    private jwtService;
    private adminService;
    private ownerService;
    private tenantService;
    private readonly logger;
    constructor(jwtService: JwtService, adminService: AdminService, ownerService: OwnerService, tenantService: TenantService);
    private jwtSecret;
    private jwtRefreshSecret;
    private jwtExpiresIn;
    private jwtRefreshExpiresIn;
    getTokens(id: number, email: string, role: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    signupTenant(dto: {
        email: string;
        password: string;
        firstname?: string;
        lastname?: string;
        idNumber?: string;
        phone?: string;
        occupation?: string;
    }): Promise<{
        role: string;
        accessToken: string;
        refreshToken: string;
        message: string;
    }>;
    loginTenant(email: string, password: string): Promise<{
        role: string;
        accessToken: string;
        refreshToken: string;
        message: string;
    }>;
    signupAdmin(email: string, password: string): Promise<{
        role: string;
        accessToken: string;
        refreshToken: string;
        message: string;
    }>;
    loginAdmin(email: string, password: string): Promise<{
        role: string;
        accessToken: string;
        refreshToken: string;
        message: string;
    }>;
    signupOwner(dto: CreateOwnerDto, ownershipProofFile?: Express.Multer.File): Promise<{
        role: string;
        accessToken: string;
        refreshToken: string;
        message: string;
    }>;
    loginOwner(email: string, password: string): Promise<{
        role: string;
        accessToken: string;
        refreshToken: string;
        message: string;
    }>;
}
