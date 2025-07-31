import { PaymentsService } from './payments.service';
import { Payment, PaymentStatus } from './payment.entity';
declare class UpdatePaymentStatusDto {
    status: PaymentStatus;
}
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    getAllPayments(): Promise<Payment[]>;
    getPaymentById(id: number): Promise<Payment>;
    updateStatus(id: number, dto: UpdatePaymentStatusDto): Promise<Payment>;
    deletePayment(id: number): Promise<void>;
}
export {};
