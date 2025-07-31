import { Repository } from 'typeorm';
import { Tenant } from './entities/tenant.entity';
import { MailService } from '../auth/email/mail.service';
import { SignupDto } from './dto/create-tenant.dto';
export declare class TenantService {
    private tenantRepository;
    private mailService;
    constructor(tenantRepository: Repository<Tenant>, mailService: MailService);
    findByEmail(email: string): Promise<Tenant | null>;
    private hashPassword;
    private generateOtp;
    private getOtpExpiry;
    private sendOtpEmail;
    createTenant(dto: SignupDto): Promise<Tenant>;
    verifyOtp(email: string, otp: string): Promise<{
        message: string;
    }>;
    resendOtp(email: string): Promise<{
        message: string;
    }>;
    findAll(): Promise<Tenant[]>;
    findById(id: number): Promise<Tenant>;
    updateTenant(id: number, updateData: Partial<Tenant>): Promise<Tenant>;
    deleteTenant(id: number): Promise<import("typeorm").DeleteResult>;
    updateRefreshToken(id: number, refreshToken: string): Promise<void>;
}
