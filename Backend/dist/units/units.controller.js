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
exports.UnitController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../shared/decorators/roles.decorator");
const role_enum_1 = require("../shared/enums/role.enum");
const units_service_1 = require("../units/units.service");
const create_unit_dto_1 = require("./dto/create-unit.dto");
const update_unit_dto_1 = require("./dto/update-unit.dto");
let UnitController = class UnitController {
    unitService;
    constructor(unitService) {
        this.unitService = unitService;
    }
    async create(dto, req) {
        const unit = await this.unitService.createUnit(dto);
        return {
            message: 'Unit Created successfully',
            data: unit,
        };
    }
    findAll() {
        return this.unitService.findAll();
    }
    findOne(id) {
        return this.unitService.findOne(id);
    }
    async update(id, dto, req) {
        const updatedUnit = await this.unitService.update(id, req.user.id, req.user.role, dto);
        return {
            message: 'Unit updated successfully',
            data: updatedUnit,
        };
    }
    async remove(id, req) {
        await this.unitService.remove(id, req.user.id, req.user.role);
        return {
            message: 'Unit Deleted successfully',
        };
    }
};
exports.UnitController = UnitController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_unit_dto_1.CreateUnitDto, Object]),
    __metadata("design:returntype", Promise)
], UnitController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UnitController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UnitController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_unit_dto_1.UpdateUnitDto, Object]),
    __metadata("design:returntype", Promise)
], UnitController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UnitController.prototype, "remove", null);
exports.UnitController = UnitController = __decorate([
    (0, common_1.Controller)('units'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.OWNER, role_enum_1.Role.ADMIN),
    __metadata("design:paramtypes", [units_service_1.UnitService])
], UnitController);
//# sourceMappingURL=units.controller.js.map