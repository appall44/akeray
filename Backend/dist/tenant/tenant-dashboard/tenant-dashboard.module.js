"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantDashboardModule = void 0;
const common_1 = require("@nestjs/common");
const tenant_dashboard_controller_1 = require("./tenant-dashboard.controller");
const tenant_dashboard_service_1 = require("./tenant-dashboard.service");
let TenantDashboardModule = class TenantDashboardModule {
};
exports.TenantDashboardModule = TenantDashboardModule;
exports.TenantDashboardModule = TenantDashboardModule = __decorate([
    (0, common_1.Module)({
        controllers: [tenant_dashboard_controller_1.TenantDashboardController],
        providers: [tenant_dashboard_service_1.TenantDashboardService],
    })
], TenantDashboardModule);
//# sourceMappingURL=tenant-dashboard.module.js.map