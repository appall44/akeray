"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const database_config_1 = require("./config/database.config");
const jwt_config_1 = require("./config/jwt.config");
const sms_config_1 = require("./config/sms.config");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./iam/users/users.module");
const user_entity_1 = require("./iam/users/entities/user.entity");
const lease_entity_1 = require("./lease/lease.entity");
const payment_entity_1 = require("./payments/payment.entity");
const sales_entity_1 = require("./sales/sales.entity");
const admin_module_1 = require("./admin/admin.module");
const admin_dashboard_module_1 = require("./admin/admin-dashboard/admin-dashboard.module");
const tenant_dashboard_module_1 = require("./tenant/tenant-dashboard/tenant-dashboard.module");
const owner_dashboard_module_1 = require("./owner/owner-dashboard/owner-dashboard.module");
const owner_module_1 = require("./owner/owner.module");
const units_module_1 = require("./units/units.module");
const property_entity_1 = require("./properties/entities/property.entity");
const unit_entity_1 = require("./units/entities/unit.entity");
const tenant_entity_1 = require("./tenant/entities/tenant.entity");
const owner_entity_1 = require("./owner/entities/owner.entity");
const admin_entity_1 = require("./admin/entities/admin.entity");
const properties_module_1 = require("./properties/properties.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [database_config_1.default, jwt_config_1.default, sms_config_1.default],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => {
                    const dbConfig = configService.get("database");
                    return {
                        type: "postgres",
                        url: dbConfig.url,
                        entities: [
                            user_entity_1.User,
                            lease_entity_1.Lease,
                            payment_entity_1.Payment,
                            Request,
                            sales_entity_1.Sale,
                            property_entity_1.Property,
                            unit_entity_1.Unit,
                            tenant_entity_1.Tenant,
                            owner_entity_1.Owner,
                            admin_entity_1.Admin,
                        ],
                        synchronize: dbConfig.synchronize,
                    };
                },
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule,
            admin_module_1.AdminModule,
            users_module_1.UsersModule,
            owner_module_1.OwnerModule,
            properties_module_1.PropertyModule,
            admin_dashboard_module_1.AdminDashboardModule,
            tenant_dashboard_module_1.TenantDashboardModule,
            owner_dashboard_module_1.OwnerDashboardModule,
            units_module_1.UnitModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map