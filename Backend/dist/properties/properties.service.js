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
exports.OwnerPropertiesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const property_entity_1 = require("./entities/property.entity");
const role_enum_1 = require("../shared/enums/role.enum");
const account_status_enum_1 = require("../iam/users/enums/account-status.enum");
const owner_entity_1 = require("../owner/entities/owner.entity");
const admin_entity_1 = require("../admin/entities/admin.entity");
let OwnerPropertiesService = class OwnerPropertiesService {
    propertyRepository;
    ownerRepository;
    adminRepository;
    constructor(propertyRepository, ownerRepository, adminRepository) {
        this.propertyRepository = propertyRepository;
        this.ownerRepository = ownerRepository;
        this.adminRepository = adminRepository;
    }
    async createProperty(userId, dto, userRole) {
        const user = userRole === role_enum_1.Role.OWNER
            ? await this.ownerRepository.findOne({ where: { id: userId } })
            : await this.adminRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException(`${userRole} not found`);
        }
        if (userRole === role_enum_1.Role.OWNER) {
            const owner = user;
            if (owner.status !== account_status_enum_1.AccountStatus.APPROVED || !owner.verified) {
                throw new common_1.ForbiddenException('Your account must be approved and verified by admin before adding properties');
            }
        }
        const propertyData = {
            name: dto.name,
            description: dto.description,
            type: dto.type,
            address: dto.address,
            city: dto.city,
            area: dto.area,
            googleMapLink: dto.googleMapLink,
            totalUnits: dto.totalUnits,
            pricePerUnit: dto.pricePerUnit,
            bedrooms: dto.bedrooms,
            bathrooms: dto.bathrooms,
            squareMeters: dto.squareMeters,
            amenities: dto.amenities,
            images: dto.images,
            featured: dto.featured,
            status: dto.status || 'active',
            payForFeatured: dto.payForFeatured,
            featuredDuration: dto.featuredDuration,
            role: userRole,
            units: [],
        };
        if (userRole === role_enum_1.Role.OWNER) {
            propertyData.owner = user;
        }
        const property = this.propertyRepository.create(propertyData);
        return this.propertyRepository.save(property);
    }
    async updateProperty(propertyId, userId, userRole, dto) {
        const property = await this.propertyRepository.findOne({
            where: { id: propertyId },
            relations: ['owner'],
        });
        if (!property) {
            throw new common_1.NotFoundException('Property not found');
        }
        if (userRole === role_enum_1.Role.OWNER && property.owner?.id !== userId) {
            throw new common_1.ForbiddenException('You do not own this property');
        }
        Object.assign(property, dto);
        return this.propertyRepository.save(property);
    }
    async deleteProperty(propertyId, userId, userRole) {
        const property = await this.propertyRepository.findOne({
            where: { id: propertyId },
            relations: ['owner', 'units'],
        });
        if (!property) {
            throw new common_1.NotFoundException('Property not found');
        }
        if (userRole === role_enum_1.Role.OWNER && property.owner?.id !== userId) {
            throw new common_1.ForbiddenException('You do not own this property');
        }
        await this.propertyRepository.remove(property);
    }
    async getAllProperties() {
        return this.propertyRepository.find({
            relations: ['owner', 'units'],
        });
    }
    async getPropertyById(propertyId, userId, userRole) {
        const property = await this.propertyRepository.findOne({
            where: userRole === role_enum_1.Role.OWNER
                ? { id: propertyId, owner: { id: userId } }
                : { id: propertyId },
            relations: ['owner', 'units'],
        });
        if (!property) {
            throw new common_1.NotFoundException('Property not found');
        }
        return property;
    }
};
exports.OwnerPropertiesService = OwnerPropertiesService;
exports.OwnerPropertiesService = OwnerPropertiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(property_entity_1.Property)),
    __param(1, (0, typeorm_1.InjectRepository)(owner_entity_1.Owner)),
    __param(2, (0, typeorm_1.InjectRepository)(admin_entity_1.Admin)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OwnerPropertiesService);
//# sourceMappingURL=properties.service.js.map