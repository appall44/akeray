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
exports.TenantController = void 0;
const common_1 = require("@nestjs/common");
const tenant_service_1 = require("./tenant.service");
const roles_decorator_1 = require("../shared/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const role_enum_1 = require("../shared/enums/role.enum");
const create_tenant_dto_1 = require("./dto/create-tenant.dto");
let TenantController = class TenantController {
    tenantService;
    constructor(tenantService) {
        this.tenantService = tenantService;
    }
    async getAllTenants() {
        return this.tenantService.findAll();
    }
    async getTenantById(id) {
        const tenant = await this.tenantService.findById(id);
        if (!tenant)
            throw new common_1.NotFoundException('Tenant not found');
        return tenant;
    }
    async updateTenant(id, updateData) {
        const updated = await this.tenantService.updateTenant(id, updateData);
        return { message: 'Tenant updated successfully', updated };
    }
    async deleteTenant(id) {
        const result = await this.tenantService.deleteTenant(id);
        if (!result.affected)
            throw new common_1.NotFoundException('Tenant not found');
        return { message: 'Tenant deleted successfully' };
    }
    async registerTenant(dto) {
        await this.tenantService.createTenant(dto);
        return { message: 'OTP sent to your email' };
    }
    async verifyOtp(body) {
        const verified = await this.tenantService.verifyOtp(body.email, body.otp);
        if (!verified)
            throw new common_1.BadRequestException('Invalid or expired OTP');
        return { message: 'Tenant verified successfully' };
    }
    async resendOtp(body) {
        if (!body || !body.email) {
            throw new common_1.BadRequestException('Email must be required');
        }
        await this.tenantService.resendOtp(body.email);
        return { message: 'OTP resent to your email' };
    }
};
exports.TenantController = TenantController;
__decorate([
    (0, common_1.Get)('admin/tenant'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TenantController.prototype, "getAllTenants", null);
__decorate([
    (0, common_1.Get)('admin/tenant/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TenantController.prototype, "getTenantById", null);
__decorate([
    (0, common_1.Patch)('admin/tenant/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TenantController.prototype, "updateTenant", null);
__decorate([
    (0, common_1.Delete)('admin/tenant/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TenantController.prototype, "deleteTenant", null);
__decorate([
    (0, common_1.Post)('tenant/signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tenant_dto_1.SignupDto]),
    __metadata("design:returntype", Promise)
], TenantController.prototype, "registerTenant", null);
__decorate([
    (0, common_1.Post)('tenant/verify-otp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TenantController.prototype, "verifyOtp", null);
__decorate([
    (0, common_1.Post)('tenant/resend-otp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TenantController.prototype, "resendOtp", null);
exports.TenantController = TenantController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [tenant_service_1.TenantService])
], TenantController);
//# sourceMappingURL=tenant.controller.js.map