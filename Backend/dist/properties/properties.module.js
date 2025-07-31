"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const property_entity_1 = require("./entities/property.entity");
const unit_entity_1 = require("../units/entities/unit.entity");
const users_module_1 = require("../iam/users/users.module");
const properties_controller_1 = require("./properties.controller");
const properties_service_1 = require("./properties.service");
const owner_entity_1 = require("../owner/entities/owner.entity");
const admin_entity_1 = require("../admin/entities/admin.entity");
let PropertyModule = class PropertyModule {
};
exports.PropertyModule = PropertyModule;
exports.PropertyModule = PropertyModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([property_entity_1.Property, unit_entity_1.Unit, owner_entity_1.Owner, admin_entity_1.Admin]),
            users_module_1.UsersModule,
        ],
        controllers: [properties_controller_1.OwnerPropertiesController],
        providers: [properties_service_1.OwnerPropertiesService],
    })
], PropertyModule);
//# sourceMappingURL=properties.module.js.map