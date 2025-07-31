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
var MailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
let MailService = MailService_1 = class MailService {
    transporter;
    logger = new common_1.Logger(MailService_1.name);
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });
    }
    async sendOtpEmail(to, otp) {
        const mailOptions = {
            from: `"Akeray Property Management System" <${process.env.GMAIL_USER}>`,
            to,
            subject: 'Akeray Property Management System - Your OTP Code',
            text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
            html: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
    <div style="background-color: #077f88; color: #fff; padding: 20px; text-align: center;">
      <h2 style="margin: 0;">Akeray Property Management System</h2>
    </div>
    <div style="padding: 30px;">
      <p style="font-size: 16px; color: #333; text-align: justify; line-height: 1.6;">
        Welcome to <strong>Akeray Property Management System</strong><br><br>
        The Akeray Property Management System (APMS) is a robust, cloud-based solution developed to streamline the operational and administrative functions of property management. It automates leasing, unit management, maintenance, financial operations, and customer notifications, ensuring efficiency, scalability, and compliance with modern data security standards.<br><br>
        Please use the following OTP to complete your verification process. This OTP is valid for <strong>3 minutes</strong>.
      </p>
      <div style="text-align: center; font-size: 32px; font-weight: bold; color: #0f7dc7; margin: 20px 0;">
        ${otp}
      </div>
      <p style="font-size: 14px; color: #999; text-align: center;">If you did not request this, please ignore this email.</p>
    </div>
    <div style="background-color: #f5f5f5; padding: 10px; text-align: center; font-size: 12px; color: #666;">
      &copy; ${new Date().getFullYear()} Akeray Property Management System. All rights reserved.
    </div>
  </div>
`,
        };
        try {
            await this.transporter.sendMail(mailOptions);
            this.logger.log(`OTP email sent to ${to}`);
        }
        catch (error) {
            this.logger.error(`Failed to send OTP email to ${to}`, error);
            throw error;
        }
    }
};
exports.MailService = MailService;
exports.MailService = MailService = MailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MailService);
//# sourceMappingURL=mail.service.js.map