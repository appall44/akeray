"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('sms', () => ({
    apiKey: process.env.SMS_API_KEY,
    senderId: process.env.SMS_SENDER_ID,
    apiUrl: process.env.SMS_API_URL,
}));
//# sourceMappingURL=sms.config.js.map