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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const auth_service_1 = require("./auth.service");
const admin_services_1 = require("../admin/admin.services");
const owner_service_1 = require("../owner/owner.service");
const tenant_service_1 = require("../tenant/tenant.service");
const create_owner_dto_1 = require("../owner/dto/create-owner.dto");
const multer_1 = require("multer");
const path_1 = require("path");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
let AuthController = class AuthController {
    authService;
    adminService;
    ownerService;
    tenantService;
    constructor(authService, adminService, ownerService, tenantService) {
        this.authService = authService;
        this.adminService = adminService;
        this.ownerService = ownerService;
        this.tenantService = tenantService;
    }
    async getProfile(req) {
        const user = req.user;
        if (!user || !user.email || !user.role) {
            throw new common_1.ForbiddenException('Invalid token or missing user information');
        }
        switch (user.role) {
            case 'admin':
                return await this.adminService.findByEmail(user.email);
            case 'owner':
                return await this.ownerService.findByEmail(user.email);
            case 'tenant':
                return await this.tenantService.findByEmail(user.email);
            default:
                throw new common_1.ForbiddenException('Unknown user role');
        }
    }
    async signupAdmin(dto) {
        const email = dto.email.trim().toLowerCase();
        const existing = await this.adminService.findByEmail(email);
        if (existing)
            throw new common_1.ForbiddenException('Email already registered');
        const user = await this.adminService.createAdmin(email, dto.password);
        const tokens = await this.authService.getTokens(user.id, user.email, 'admin');
        await this.adminService.updateRefreshToken(user.id, tokens.refreshToken);
        return { message: 'Admin created successfully', ...tokens, role: 'admin' };
    }
    async registerOwner(dto, file) {
        if (!dto.agreementsAccepted) {
            throw new common_1.BadRequestException('Agreements must be accepted');
        }
        const ownershipProofUrl = file ? file.filename : undefined;
        const created = await this.ownerService.createOwner({
            ...dto,
            ownershipProofUrl,
            verified: false,
        });
        return {
            message: 'Owner registered successfully',
            owner: created,
        };
    }
    async signupTenant(dto) {
        const email = dto.email.trim().toLowerCase();
        const existing = await this.tenantService.findByEmail(email);
        if (existing)
            throw new common_1.ForbiddenException('Email already registered');
        const user = await this.tenantService.createTenant({
            email,
            password: dto.password,
            firstname: dto.firstName || '',
            lastname: dto.lastName || '',
            idNumber: dto.idNumber || '',
            phone: dto.phone || '',
            occupation: dto.occupation || '',
            role: 'tenant',
            verified: false,
        });
        const tokens = await this.authService.getTokens(user.id, user.email, 'tenant');
        await this.tenantService.updateRefreshToken(user.id, tokens.refreshToken);
        return { message: 'Tenant account created successfully, OTP sent to email', ...tokens, role: 'tenant' };
    }
    async loginAdmin(dto) {
        const email = dto.email.trim().toLowerCase();
        return this.authService.loginAdmin(email, dto.password);
    }
    async loginOwner(dto) {
        const email = dto.email.trim().toLowerCase();
        return this.authService.loginOwner(email, dto.password);
    }
    async loginTenant(dto) {
        const email = dto.email.trim().toLowerCase();
        return this.authService.loginTenant(email, dto.password);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)('admin/signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signupAdmin", null);
__decorate([
    (0, common_1.Post)('owner/signup'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('ownershipProof', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/ownership-proofs',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
            },
        }),
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_owner_dto_1.CreateOwnerDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerOwner", null);
__decorate([
    (0, common_1.Post)('tenant/signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signupTenant", null);
__decorate([
    (0, common_1.Post)('admin/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginAdmin", null);
__decorate([
    (0, common_1.Post)('owner/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginOwner", null);
__decorate([
    (0, common_1.Post)('tenant/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginTenant", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        admin_services_1.AdminService,
        owner_service_1.OwnerService,
        tenant_service_1.TenantService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map