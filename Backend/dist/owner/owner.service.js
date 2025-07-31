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
exports.OwnerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const owner_entity_1 = require("./entities/owner.entity");
const account_status_enum_1 = require("../iam/users/enums/account-status.enum");
const bcrypt = require("bcrypt");
let OwnerService = class OwnerService {
    ownerRepo;
    constructor(ownerRepo) {
        this.ownerRepo = ownerRepo;
    }
    async findByEmail(email) {
        return this.ownerRepo.findOne({ where: { email } });
    }
    async createOwner(dto) {
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const owner = this.ownerRepo.create({
            ...dto,
            password: hashedPassword,
            status: account_status_enum_1.AccountStatus.PENDING,
        });
        return this.ownerRepo.save(owner);
    }
    async updateOwner(id, data) {
        await this.ownerRepo.update(id, data);
        return this.ownerRepo.findOneBy({ id });
    }
    async deleteOwner(id) {
        return this.ownerRepo.delete(id);
    }
    async verifyOwner(id) {
        const owner = await this.findById(id);
        owner.status = account_status_enum_1.AccountStatus.APPROVED;
        owner.verified = true;
        return this.ownerRepo.save(owner);
    }
    async saveOwner(owner) {
        return this.ownerRepo.save(owner);
    }
    async findPendingOwners() {
        return this.ownerRepo.find({
            where: { status: account_status_enum_1.AccountStatus.PENDING },
        });
    }
    async updateRefreshToken(id, refreshToken) {
        const owner = await this.findById(id);
        owner.refreshToken = refreshToken;
        await this.ownerRepo.save(owner);
    }
    async findAll() {
        return this.ownerRepo.find();
    }
    async findById(id) {
        const owner = await this.ownerRepo.findOne({ where: { id } });
        if (!owner)
            throw new common_1.NotFoundException('Owner not found');
        return owner;
    }
};
exports.OwnerService = OwnerService;
exports.OwnerService = OwnerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(owner_entity_1.Owner)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OwnerService);
//# sourceMappingURL=owner.service.js.map