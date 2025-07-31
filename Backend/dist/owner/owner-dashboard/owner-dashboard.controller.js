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
exports.OwnerDashboardController = void 0;
const common_1 = require("@nestjs/common");
const owner_dashboard_service_1 = require("./owner-dashboard.service");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../shared/decorators/roles.decorator");
let OwnerDashboardController = class OwnerDashboardController {
    ownerDashboardService;
    constructor(ownerDashboardService) {
        this.ownerDashboardService = ownerDashboardService;
    }
    getDashboard() {
        return this.ownerDashboardService.getOwnerStats();
    }
};
exports.OwnerDashboardController = OwnerDashboardController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OwnerDashboardController.prototype, "getDashboard", null);
exports.OwnerDashboardController = OwnerDashboardController = __decorate([
    (0, common_1.Controller)('owner/dashboard'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('owner'),
    __metadata("design:paramtypes", [owner_dashboard_service_1.OwnerDashboardService])
], OwnerDashboardController);
//# sourceMappingURL=owner-dashboard.controller.js.map