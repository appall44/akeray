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
exports.Lease = void 0;
const typeorm_1 = require("typeorm");
let Lease = class Lease extends typeorm_1.BaseEntity {
    id;
    leaseId;
    property;
    unit;
    address;
    tenant;
    landlord;
    startDate;
    endDate;
    monthlyRent;
    deposit;
    status;
    renewalOption;
    noticePeriod;
    lateFeePenalty;
    leaseTerms;
    paymentSchedule;
};
exports.Lease = Lease;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Lease.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Lease.prototype, "leaseId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Lease.prototype, "property", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Lease.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Lease.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Lease.prototype, "tenant", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Lease.prototype, "landlord", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], Lease.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], Lease.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Lease.prototype, "monthlyRent", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Lease.prototype, "deposit", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Lease.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Lease.prototype, "renewalOption", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Lease.prototype, "noticePeriod", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Lease.prototype, "lateFeePenalty", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { array: true }),
    __metadata("design:type", Array)
], Lease.prototype, "leaseTerms", void 0);
__decorate([
    (0, typeorm_1.Column)("jsonb"),
    __metadata("design:type", Array)
], Lease.prototype, "paymentSchedule", void 0);
exports.Lease = Lease = __decorate([
    (0, typeorm_1.Entity)()
], Lease);
//# sourceMappingURL=lease.entity.js.map