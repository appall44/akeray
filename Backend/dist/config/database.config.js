"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('database', () => ({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_SSL === 'true',
    synchronize: process.env.TYPEORM_SYNC === 'true',
}));
//# sourceMappingURL=database.config.js.map