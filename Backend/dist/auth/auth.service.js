"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const admin_services_1 = require("../admin/admin.services");
const owner_service_1 = require("../owner/owner.service");
const tenant_service_1 = require("../tenant/tenant.service");
let AuthService = AuthService_1 = class AuthService {
    jwtService;
    adminService;
    ownerService;
    tenantService;
    logger = new common_1.Logger(AuthService_1.name);
    constructor(jwtService, adminService, ownerService, tenantService) {
        this.jwtService = jwtService;
        this.adminService = adminService;
        this.ownerService = ownerService;
        this.tenantService = tenantService;
    }
    jwtSecret = process.env.JWT_SECRET || 'secret';
    jwtRefreshSecret = process.env.JWT_REFRESH_SECRET || 'refreshSecret';
    jwtExpiresIn = '15m';
    jwtRefreshExpiresIn = '7d';
    async getTokens(id, email, role) {
        try {
            const [accessToken, refreshToken] = await Promise.all([
                this.jwtService.signAsync({ sub: id, email, role }, { secret: this.jwtSecret, expiresIn: this.jwtExpiresIn }),
                this.jwtService.signAsync({ sub: id, email, role }, { secret: this.jwtRefreshSecret, expiresIn: this.jwtRefreshExpiresIn }),
            ]);
            return { accessToken, refreshToken };
        }
        catch (error) {
            this.logger.error('Token generation failed', error.stack);
            throw new common_1.InternalServerErrorException('Could not generate tokens');
        }
    }
    async signupTenant(dto) {
        try {
            const email = dto.email.trim().toLowerCase();
            const existing = await this.tenantService.findByEmail(email);
            if (existing)
                throw new common_1.ForbiddenException('Email already registered');
            const hashedPassword = await bcrypt.hash(dto.password, 10);
            const user = await this.tenantService.createTenant({
                email,
                password: hashedPassword,
                firstname: dto.firstname || '',
                lastname: dto.lastname || '',
                idNumber: dto.idNumber || '',
                phone: dto.phone || '',
                occupation: dto.occupation || '',
                role: 'tenant',
                verified: false,
            });
            const tokens = await this.getTokens(user.id, user.email, 'tenant');
            await this.tenantService.updateRefreshToken(user.id, tokens.refreshToken);
            return { message: 'Tenant created', ...tokens, role: 'tenant' };
        }
        catch (error) {
            this.logger.error('Tenant signup failed', error.stack);
            if (error instanceof common_1.ForbiddenException)
                throw error;
            throw new common_1.InternalServerErrorException('Tenant signup failed');
        }
    }
    async loginTenant(email, password) {
        try {
            const user = await this.tenantService.findByEmail(email);
            if (!user) {
                this.logger.warn(`Tenant not found for email: ${email}`);
                throw new common_1.ForbiddenException('Invalid credentials');
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                this.logger.warn(`Invalid password for tenant: ${email}`);
                throw new common_1.ForbiddenException('Invalid credentials');
            }
            const tokens = await this.getTokens(user.id, user.email, 'tenant');
            await this.tenantService.updateRefreshToken(user.id, tokens.refreshToken);
            return { message: 'Tenant login successful', ...tokens, role: 'tenant' };
        }
        catch (error) {
            this.logger.error('Tenant login failed', error.stack);
            if (error instanceof common_1.ForbiddenException)
                throw error;
            throw new common_1.InternalServerErrorException('Tenant login failed');
        }
    }
    async signupAdmin(email, password) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await this.adminService.createAdmin(email, hashedPassword);
            const tokens = await this.getTokens(user.id, user.email, 'admin');
            await this.adminService.updateRefreshToken(user.id, tokens.refreshToken);
            return { message: 'Admin created', ...tokens, role: 'admin' };
        }
        catch (error) {
            this.logger.error('Admin signup failed', error.stack);
            throw new common_1.InternalServerErrorException('Admin signup failed');
        }
    }
    async loginAdmin(email, password) {
        try {
            this.logger.log(`Attempting admin login for email: ${email}`);
            const user = await this.adminService.findByEmail(email);
            if (!user) {
                this.logger.warn(`Admin not found with email: ${email}`);
                throw new common_1.ForbiddenException('Invalid credentials');
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                this.logger.warn(`Password mismatch for admin: ${email}`);
                throw new common_1.ForbiddenException('Invalid credentials');
            }
            const tokens = await this.getTokens(user.id, user.email, 'admin');
            await this.adminService.updateRefreshToken(user.id, tokens.refreshToken);
            this.logger.log(`Admin login successful for email: ${email}`);
            return { message: 'Admin login successful', ...tokens, role: 'admin' };
        }
        catch (error) {
            this.logger.error(`Admin login failed for email: ${email}`, error.stack);
            if (error instanceof common_1.ForbiddenException)
                throw error;
            throw new common_1.InternalServerErrorException('Admin login failed');
        }
    }
    async signupOwner(dto, ownershipProofFile) {
        try {
            const email = dto.email.trim().toLowerCase();
            const existing = await this.ownerService.findByEmail(email);
            if (existing)
                throw new common_1.ForbiddenException('Email already registered');
            const ownershipProofUrl = ownershipProofFile
                ? `/uploads/${ownershipProofFile.filename}`
                : '';
            const hashedPassword = await bcrypt.hash(dto.password, 10);
            const user = await this.ownerService.createOwner({
                firstName: dto.firstName,
                lastName: dto.lastName,
                idNumber: dto.idNumber,
                phone: dto.phone,
                email,
                password: hashedPassword,
                location: dto.location,
                googleMapLink: dto.googleMapLink,
                agreementsAccepted: dto.agreementsAccepted,
                ownershipProofUrl,
                role: 'owner',
                verified: false,
            });
            const tokens = await this.getTokens(user.id, user.email, 'owner');
            await this.ownerService.updateRefreshToken(user.id, tokens.refreshToken);
            return { message: 'Owner created', ...tokens, role: 'owner' };
        }
        catch (error) {
            this.logger.error('Owner signup failed', error.stack);
            if (error instanceof common_1.ForbiddenException)
                throw error;
            throw new common_1.InternalServerErrorException('Owner signup failed');
        }
    }
    async loginOwner(email, password) {
        try {
            const owner = await this.ownerService.findByEmail(email);
            if (!owner) {
                throw new common_1.ForbiddenException('Invalid credentials');
            }
            const passwordMatches = await bcrypt.compare(password, owner.password);
            if (!passwordMatches) {
                throw new common_1.ForbiddenException('Invalid credentials');
            }
            const tokens = await this.getTokens(owner.id, owner.email, 'owner');
            await this.ownerService.updateRefreshToken(owner.id, tokens.refreshToken);
            return {
                message: 'Login successful',
                ...tokens,
                role: 'owner',
            };
        }
        catch (error) {
            this.logger.error('Owner login failed', error.stack);
            if (error instanceof common_1.ForbiddenException)
                throw error;
            throw new common_1.InternalServerErrorException('Owner login failed');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        admin_services_1.AdminService,
        owner_service_1.OwnerService,
        tenant_service_1.TenantService])
], AuthService);
//# sourceMappingURL=auth.service.js.map