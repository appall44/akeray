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
exports.OwnerPropertiesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const properties_service_1 = require("./properties.service");
const roles_guard_1 = require("../auth/guards/roles.guard");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_decorator_1 = require("../shared/decorators/roles.decorator");
const role_enum_1 = require("../shared/enums/role.enum");
const update_property_dto_1 = require("./dto/update-property.dto");
let OwnerPropertiesController = class OwnerPropertiesController {
    service;
    constructor(service) {
        this.service = service;
    }
    async createProperty(images, body, req) {
        const userId = req.user.id;
        const userRole = req.user.role;
        try {
            const dto = {
                name: String(body.name),
                description: String(body.description),
                type: String(body.type),
                address: String(body.address),
                city: String(body.city),
                area: String(body.area),
                totalUnits: parseInt(body.totalUnits, 10),
                pricePerUnit: parseFloat(body.pricePerUnit),
                bedrooms: parseInt(body.bedrooms, 10),
                bathrooms: parseInt(body.bathrooms, 10),
                squareMeters: body.squareMeters
                    ? parseFloat(body.squareMeters)
                    : undefined,
                googleMapLink: body.googleMapLink || undefined,
                featured: body.featured === 'true' || body.featured === true,
                status: String(body.status),
                payForFeatured: body.payForFeatured === 'true' || body.payForFeatured === true,
                featuredDuration: String(body.featuredDuration),
                amenities: Array.isArray(body.amenities)
                    ? body.amenities
                    : typeof body.amenities === 'string'
                        ? [body.amenities]
                        : [],
                images: images.map((file) => file.filename),
            };
            console.log('Parsed DTO:', dto);
            const property = await this.service.createProperty(userId, dto, userRole);
            return {
                message: 'Property created successfully',
                property,
            };
        }
        catch (error) {
            console.error('Property creation error:', error);
            throw new common_1.HttpException('Invalid data format: ' + error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    findAll() {
        return this.service.getAllProperties();
    }
    async getPropertyById(id, req) {
        const userId = req.user.id;
        const userRole = req.user.role;
        const property = await this.service.getPropertyById(id, userId, userRole);
        if (!property) {
            throw new common_1.HttpException('Property not found', common_1.HttpStatus.NOT_FOUND);
        }
        return property;
    }
    async updateProperty(id, dto, req) {
        const userId = req.user.id;
        const userRole = req.user.role;
        const updatedProperty = await this.service.updateProperty(id, userId, userRole, dto);
        return { message: 'Property updated successfully', property: updatedProperty };
    }
    async deleteProperty(id, req) {
        const userId = req.user.id;
        const userRole = req.user.role;
        await this.service.deleteProperty(id, userId, userRole);
        return { message: 'Property deleted successfully' };
    }
};
exports.OwnerPropertiesController = OwnerPropertiesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images', 10, {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/properties',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, `${file.fieldname}-${uniqueSuffix}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object, Object]),
    __metadata("design:returntype", Promise)
], OwnerPropertiesController.prototype, "createProperty", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OwnerPropertiesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], OwnerPropertiesController.prototype, "getPropertyById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_property_dto_1.UpdatePropertyDto, Object]),
    __metadata("design:returntype", Promise)
], OwnerPropertiesController.prototype, "updateProperty", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], OwnerPropertiesController.prototype, "deleteProperty", null);
exports.OwnerPropertiesController = OwnerPropertiesController = __decorate([
    (0, common_1.Controller)('owner/properties'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.OWNER, role_enum_1.Role.ADMIN),
    __metadata("design:paramtypes", [properties_service_1.OwnerPropertiesService])
], OwnerPropertiesController);
//# sourceMappingURL=properties.controller.js.map