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
exports.OwnerController = void 0;
const common_1 = require("@nestjs/common");
const owner_service_1 = require("./owner.service");
const roles_decorator_1 = require("../shared/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const role_enum_1 = require("../shared/enums/role.enum");
const create_owner_dto_1 = require("./dto/create-owner.dto");
const account_status_enum_1 = require("../iam/users/enums/account-status.enum");
const create_property_dto_1 = require("../properties/dto/create-property.dto");
let OwnerController = class OwnerController {
    ownerService;
    constructor(ownerService) {
        this.ownerService = ownerService;
    }
    service;
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
    async getPendingOwners() {
        return this.ownerService.findPendingOwners();
    }
    async getAllOwners() {
        return this.ownerService.findAll();
    }
    async getOwnerById(id) {
        return this.ownerService.findById(id);
    }
    async updateOwner(id, updateData) {
        const owner = await this.ownerService.findById(id);
        if (!owner)
            throw new common_1.NotFoundException('Owner not found');
        const updated = await this.ownerService.updateOwner(id, updateData);
        return { message: 'Owner updated successfully', updated };
    }
    async verifyOwner(id) {
        const owner = await this.ownerService.findById(id);
        if (!owner)
            throw new common_1.NotFoundException('Owner not found');
        if (owner.status === account_status_enum_1.AccountStatus.APPROVED) {
            return { message: 'Owner already verified' };
        }
        owner.status = account_status_enum_1.AccountStatus.APPROVED;
        owner.verified = true;
        const updated = await this.ownerService.saveOwner(owner);
        return {
            message: 'Owner verified successfully',
            ownerId: updated.id,
            status: updated.status,
        };
    }
    async createProperty(dto, req) {
        const userId = req.user.id;
        const userRole = req.user.role;
        const property = await this.service.createProperty(userId, dto, userRole);
        return { message: 'Property created successfully', property };
    }
    async deleteOwner(id) {
        const result = await this.ownerService.deleteOwner(id);
        if (!result.affected)
            throw new common_1.NotFoundException('Owner not found');
        return { message: 'Owner deleted successfully' };
    }
};
exports.OwnerController = OwnerController;
__decorate([
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_owner_dto_1.CreateOwnerDto, Object]),
    __metadata("design:returntype", Promise)
], OwnerController.prototype, "registerOwner", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, common_1.Get)('admin/owners/pending'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OwnerController.prototype, "getPendingOwners", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, common_1.Get)('admin/owners'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OwnerController.prototype, "getAllOwners", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, common_1.Get)('admin/owners/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OwnerController.prototype, "getOwnerById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, common_1.Patch)('admin/owners/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], OwnerController.prototype, "updateOwner", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, common_1.Patch)('admin/owners/verify/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OwnerController.prototype, "verifyOwner", null);
__decorate([
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_property_dto_1.CreatePropertyDto, Object]),
    __metadata("design:returntype", Promise)
], OwnerController.prototype, "createProperty", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, common_1.Delete)('admin/owners/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OwnerController.prototype, "deleteOwner", null);
exports.OwnerController = OwnerController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [owner_service_1.OwnerService])
], OwnerController);
//# sourceMappingURL=owner.controller.js.map