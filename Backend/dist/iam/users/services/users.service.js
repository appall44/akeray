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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../../../auth/auth.service");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const typeorm_2 = require("@nestjs/typeorm");
const user_role_enum_1 = require("../enums/user-role.enum");
const bcrypt = require("bcrypt");
const account_status_enum_1 = require("../enums/account-status.enum");
let UsersService = class UsersService {
    usersRepository;
    authService;
    constructor(usersRepository, authService) {
        this.usersRepository = usersRepository;
        this.authService = authService;
    }
    normalizeEmail(email) {
        return email.trim().toLowerCase();
    }
    async findByEmail(email) {
        const normalizedEmail = this.normalizeEmail(email);
        return this.usersRepository.findOne({ where: { email: normalizedEmail } });
    }
    async findById(id) {
        return this.usersRepository.findOne({ where: { id } });
    }
    async hashPassword(password) {
        if (!password) {
            throw new common_1.ConflictException('Password is required');
        }
        return bcrypt.hash(password, 10);
    }
    async createTenant(data) {
        data.email = this.normalizeEmail(data.email);
        const exists = await this.findByEmail(data.email);
        if (exists)
            throw new common_1.ConflictException('Email already registered');
        data.role = user_role_enum_1.UserRole.TENANT;
        const user = this.usersRepository.create(data);
        return this.usersRepository.save(user);
    }
    async createOwner(data) {
        data.email = this.normalizeEmail(data.email);
        const exists = await this.findByEmail(data.email);
        if (exists)
            throw new common_1.ConflictException('Email already registered');
        data.role = user_role_enum_1.UserRole.OWNER;
        const user = this.usersRepository.create(data);
        return this.usersRepository.save(user);
    }
    async createAdmin(data) {
        const exists = await this.findByEmail(data.email);
        if (exists)
            throw new common_1.ConflictException('Email already registered');
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = this.usersRepository.create({
            ...data,
            password: hashedPassword,
            role: user_role_enum_1.UserRole.ADMIN,
            isVerified: true,
            status: account_status_enum_1.AccountStatus.APPROVED,
        });
        return this.usersRepository.save(user);
    }
    async updateRefreshToken(userId, refreshToken) {
        const user = await this.findById(userId);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        user.refreshToken = refreshToken;
        await this.usersRepository.save(user);
    }
    async findAll() {
        return this.usersRepository.find();
    }
    async update(id, updateData) {
        const user = await this.findById(id);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        if (updateData.email) {
            updateData.email = this.normalizeEmail(updateData.email);
        }
        Object.assign(user, updateData);
        return this.usersRepository.save(user);
    }
    async remove(id) {
        const user = await this.findById(id);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        await this.usersRepository.remove(user);
    }
    async verifyOwner(userId) {
        const user = await this.findById(userId);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        if (user.role !== user_role_enum_1.UserRole.OWNER)
            throw new common_1.ConflictException('Only owners can be verified');
        user.isVerified = true;
        user.status = account_status_enum_1.AccountStatus.APPROVED;
        return this.usersRepository.save(user);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        auth_service_1.AuthService])
], UsersService);
//# sourceMappingURL=users.service.js.map