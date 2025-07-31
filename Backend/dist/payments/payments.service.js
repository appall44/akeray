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
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const payment_entity_1 = require("./payment.entity");
let PaymentsService = class PaymentsService {
    paymentsRepository;
    constructor(paymentsRepository) {
        this.paymentsRepository = paymentsRepository;
    }
    async getAllPayments() {
        return this.paymentsRepository.find({ relations: ['lease'] });
    }
    async getPaymentById(id) {
        const payment = await this.paymentsRepository.findOne({
            where: { id },
            relations: ['lease'],
        });
        if (!payment) {
            throw new common_1.NotFoundException(`Payment with ID ${id} not found`);
        }
        return payment;
    }
    async updatePaymentStatus(id, status) {
        const payment = await this.getPaymentById(id);
        payment.status = status;
        if (status === payment_entity_1.PaymentStatus.COMPLETED) {
            payment.paidAt = new Date();
        }
        return this.paymentsRepository.save(payment);
    }
    async deletePayment(id) {
        const result = await this.paymentsRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Payment with ID ${id} not found`);
        }
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map