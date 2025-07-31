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
exports.UnitService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const unit_entity_1 = require("./entities/unit.entity");
const property_entity_1 = require("../properties/entities/property.entity");
const role_enum_1 = require("../shared/enums/role.enum");
let UnitService = class UnitService {
    unitRepository;
    propertyRepository;
    constructor(unitRepository, propertyRepository) {
        this.unitRepository = unitRepository;
        this.propertyRepository = propertyRepository;
    }
    async createUnit(dto) {
        const property = await this.propertyRepository.findOneBy({ id: dto.propertyId });
        if (!property) {
            throw new common_1.NotFoundException('Property not found');
        }
        const existingUnit = await this.unitRepository.findOne({
            where: {
                unitNumber: dto.unitNumber,
                property: { id: dto.propertyId },
            },
            relations: ['property'],
        });
        if (existingUnit) {
            throw new common_1.BadRequestException(`Unit number "${dto.unitNumber}" already exists for this property.`);
        }
        const unit = this.unitRepository.create({
            unitNumber: dto.unitNumber,
            occupied: dto.occupied ?? false,
            status: dto.status,
            price: dto.price,
            property: property,
        });
        return this.unitRepository.save(unit);
    }
    async findAll() {
        return this.unitRepository.find({ relations: ['property'] });
    }
    async findOne(id) {
        const unit = await this.unitRepository.findOne({
            where: { id },
            relations: ['property'],
        });
        if (!unit)
            throw new common_1.NotFoundException('Unit not found');
        return unit;
    }
    async update(id, userId, role, dto) {
        const unit = await this.unitRepository.findOne({
            where: { id },
            relations: ['property', 'property.owner'],
        });
        if (!unit)
            throw new common_1.NotFoundException('Unit not found');
        if (role === role_enum_1.Role.OWNER && unit.property.owner?.id !== userId) {
            throw new common_1.ForbiddenException('You are not allowed to update this unit');
        }
        Object.assign(unit, dto);
        return this.unitRepository.save(unit);
    }
    async remove(id, userId, role) {
        const unit = await this.unitRepository.findOne({
            where: { id },
            relations: ['property', 'property.owner'],
        });
        if (!unit)
            throw new common_1.NotFoundException('Unit not found');
        if (role === role_enum_1.Role.OWNER && unit.property.owner?.id !== userId) {
            throw new common_1.ForbiddenException('You are not allowed to delete this unit');
        }
        await this.unitRepository.remove(unit);
    }
};
exports.UnitService = UnitService;
exports.UnitService = UnitService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(unit_entity_1.Unit)),
    __param(1, (0, typeorm_1.InjectRepository)(property_entity_1.Property)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UnitService);
//# sourceMappingURL=units.service.js.map