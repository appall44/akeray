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
exports.Unit = void 0;
const typeorm_1 = require("typeorm");
const property_entity_1 = require("../../properties/entities/property.entity");
const unit_status_enum_1 = require("../../shared/enums/unit-status.enum");
let Unit = class Unit {
    id;
    unitNumber;
    occupied;
    status;
    price;
    property;
};
exports.Unit = Unit;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Unit.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Unit.prototype, "unitNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Unit.prototype, "occupied", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: unit_status_enum_1.UnitStatus, default: unit_status_enum_1.UnitStatus.VACANT }),
    __metadata("design:type", String)
], Unit.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal'),
    __metadata("design:type", Number)
], Unit.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => property_entity_1.Property, (property) => property.units, {
        nullable: false,
        onDelete: 'CASCADE',
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'property_id' }),
    __metadata("design:type", property_entity_1.Property)
], Unit.prototype, "property", void 0);
exports.Unit = Unit = __decorate([
    (0, typeorm_1.Entity)('units')
], Unit);
//# sourceMappingURL=unit.entity.js.map