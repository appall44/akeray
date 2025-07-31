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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth/auth.service");
class AdminSignupDto {
    email;
    password;
}
class AdminLoginDto {
    email;
    password;
}
let AdminController = class AdminController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async signup(dto) {
        const { email, password } = dto;
        try {
            return await this.authService.signupAdmin(email, password);
        }
        catch (error) {
            throw new common_1.ForbiddenException(error.message);
        }
    }
    async login(dto) {
        const { email, password } = dto;
        try {
            return await this.authService.loginAdmin(email, password);
        }
        catch (error) {
            throw new common_1.ForbiddenException(error.message);
        }
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AdminSignupDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AdminLoginDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "login", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map