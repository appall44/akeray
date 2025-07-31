"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let NotificationsService = class NotificationsService {
    async sendSms(to, message) {
        const apiKey = process.env.GEEZ_SMS_API_KEY;
        const senderId = process.env.GEEZ_SMS_SENDER_ID;
        const response = await axios_1.default.post('https://api.geezsms.com/v1/send', {
            api_key: apiKey,
            to,
            message,
            sender_id: senderId,
        });
        if (response.data.status !== 'success') {
            throw new Error('SMS sending failed');
        }
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)()
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map