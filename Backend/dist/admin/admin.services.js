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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const admin_entity_1 = require("./entities/admin.entity");
let AdminService = class AdminService {
    adminRepository;
    constructor(adminRepository) {
        this.adminRepository = adminRepository;
    }
    async findByEmail(email) {
        return this.adminRepository.findOne({ where: { email } });
    }
    async createAdmin(email, password) {
        const exists = await this.findByEmail(email);
        if (exists)
            throw new common_1.ConflictException('Email already registered');
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = this.adminRepository.create({ email, password: hashedPassword });
        return this.adminRepository.save(admin);
    }
    async updateRefreshToken(id, refreshToken) {
        const admin = await this.adminRepository.findOne({ where: { id } });
        if (!admin)
            throw new common_1.NotFoundException('Admin not found');
        admin.refreshToken = refreshToken;
        await this.adminRepository.save(admin);
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_entity_1.Admin)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AdminService);
//# sourceMappingURL=admin.services.js.map