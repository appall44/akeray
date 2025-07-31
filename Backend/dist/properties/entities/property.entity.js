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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Property = void 0;
const typeorm_1 = require("typeorm");
const unit_entity_1 = require("../../units/entities/unit.entity");
const owner_entity_1 = require("../../owner/entities/owner.entity");
const role_enum_1 = require("../../shared/enums/role.enum");
let Property = class Property {
    id;
    name;
    description;
    type;
    address;
    city;
    area;
    googleMapLink;
    totalUnits;
    pricePerUnit;
    bedrooms;
    bathrooms;
    squareMeters;
    amenities;
    images;
    featured;
    status;
    payForFeatured;
    featuredDuration;
    role;
    ownerId;
    owner;
    units;
};
exports.Property = Property;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Property.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Property.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Property.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Property.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Property.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Property.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Property.prototype, "area", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Property.prototype, "googleMapLink", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], Property.prototype, "totalUnits", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal'),
    __metadata("design:type", Number)
], Property.prototype, "pricePerUnit", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], Property.prototype, "bedrooms", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], Property.prototype, "bathrooms", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { nullable: true }),
    __metadata("design:type", Number)
], Property.prototype, "squareMeters", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], Property.prototype, "amenities", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], Property.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Property.prototype, "featured", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'active' }),
    __metadata("design:type", String)
], Property.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Property.prototype, "payForFeatured", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '30' }),
    __metadata("design:type", String)
], Property.prototype, "featuredDuration", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: role_enum_1.Role, default: role_enum_1.Role.OWNER }),
    __metadata("design:type", String)
], Property.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Property.prototype, "ownerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => owner_entity_1.Owner, (owner) => owner.properties, { eager: false }),
    (0, typeorm_1.JoinColumn)({ name: 'ownerId' }),
    __metadata("design:type", owner_entity_1.Owner)
], Property.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => unit_entity_1.Unit, (unit) => unit.property, { cascade: true }),
    __metadata("design:type", Array)
], Property.prototype, "units", void 0);
exports.Property = Property = __decorate([
    (0, typeorm_1.Entity)('properties')
], Property);
//# sourceMappingURL=property.entity.js.map