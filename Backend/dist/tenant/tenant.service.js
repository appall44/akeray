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
exports.TenantService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const tenant_entity_1 = require("./entities/tenant.entity");
const mail_service_1 = require("../auth/email/mail.service");
let TenantService = class TenantService {
    tenantRepository;
    mailService;
    constructor(tenantRepository, mailService) {
        this.tenantRepository = tenantRepository;
        this.mailService = mailService;
    }
    async findByEmail(email) {
        return this.tenantRepository.findOne({ where: { email } });
    }
    async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }
    generateOtp() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    getOtpExpiry() {
        const expiry = new Date();
        expiry.setMinutes(expiry.getMinutes() + 10);
        return expiry;
    }
    async sendOtpEmail(email, otp) {
        console.log(`Sending OTP ${otp} to email ${email}`);
        await this.mailService.sendOtpEmail(email, otp);
    }
    async createTenant(dto) {
        const tenant = this.tenantRepository.create({
            email: dto.email,
            password: await this.hashPassword(dto.password),
            firstname: dto.firstname,
            lastname: dto.lastname,
            idNumber: dto.idNumber,
            phone: dto.phone,
            occupation: dto.occupation,
            otp: this.generateOtp(),
            otpExpiresAt: this.getOtpExpiry(),
            verified: false,
            role: 'TENANT',
        });
        await this.tenantRepository.save(tenant);
        if (!tenant.email || !tenant.otp) {
            throw new Error('Email or OTP is missing');
        }
        await this.sendOtpEmail(tenant.email, tenant.otp);
        return tenant;
    }
    async verifyOtp(email, otp) {
        const tenant = await this.findByEmail(email);
        if (!tenant)
            throw new common_1.NotFoundException('Tenant not found');
        if (!tenant.otp || !tenant.otpExpiresAt) {
            throw new common_1.BadRequestException('No OTP found. Please request again.');
        }
        const now = new Date();
        if (tenant.otp !== otp)
            throw new common_1.BadRequestException('Invalid OTP');
        if (tenant.otpExpiresAt < now)
            throw new common_1.BadRequestException('OTP expired');
        tenant.verified = true;
        tenant.otp = null;
        tenant.otpExpiresAt = null;
        await this.tenantRepository.save(tenant);
        return { message: 'OTP verified. You can now log in.' };
    }
    async resendOtp(email) {
        const tenant = await this.findByEmail(email);
        if (!tenant)
            throw new common_1.NotFoundException('Tenant not found');
        if (tenant.verified)
            throw new common_1.BadRequestException('Already verified');
        const otp = this.generateOtp();
        const otpExpiresAt = this.getOtpExpiry();
        tenant.otp = otp;
        tenant.otpExpiresAt = otpExpiresAt;
        await this.tenantRepository.save(tenant);
        await this.sendOtpEmail(email, otp);
        return { message: 'OTP resent to email.' };
    }
    async findAll() {
        return this.tenantRepository.find();
    }
    async findById(id) {
        const tenant = await this.tenantRepository.findOne({ where: { id } });
        if (!tenant)
            throw new common_1.NotFoundException('Tenant not found');
        return tenant;
    }
    async updateTenant(id, updateData) {
        const tenant = await this.findById(id);
        Object.assign(tenant, updateData);
        return this.tenantRepository.save(tenant);
    }
    async deleteTenant(id) {
        const result = await this.tenantRepository.delete(id);
        if (!result.affected)
            throw new common_1.NotFoundException('Tenant not found');
        return result;
    }
    async updateRefreshToken(id, refreshToken) {
        const tenant = await this.findById(id);
        tenant.refreshToken = refreshToken;
        await this.tenantRepository.save(tenant);
    }
};
exports.TenantService = TenantService;
exports.TenantService = TenantService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tenant_entity_1.Tenant)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        mail_service_1.MailService])
], TenantService);
//# sourceMappingURL=tenant.service.js.map