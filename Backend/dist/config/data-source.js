"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv = require("dotenv");
dotenv.config();
const user_entity_1 = require("../iam/users/entities/user.entity");
const property_entity_1 = require("../properties/entities/property.entity");
const unit_entity_1 = require("../units/entities/unit.entity");
const lease_entity_1 = require("../lease/lease.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    synchronize: true,
    logging: false,
    entities: [user_entity_1.User, property_entity_1.Property, unit_entity_1.Unit, lease_entity_1.Lease],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map