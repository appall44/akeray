import { Repository } from 'typeorm';
import { Payment, PaymentStatus } from './payment.entity';
export declare class PaymentsService {
    private paymentsRepository;
    constructor(paymentsRepository: Repository<Payment>);
    getAllPayments(): Promise<Payment[]>;
    getPaymentById(id: number): Promise<Payment>;
    updatePaymentStatus(id: number, status: PaymentStatus): Promise<Payment>;
    deletePayment(id: number): Promise<void>;
}
