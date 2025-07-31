import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment, PaymentStatus } from './payment.entity';
import { Lease } from '../lease/lease.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
  ) {}

  async getAllPayments(): Promise<Payment[]> {
    return this.paymentsRepository.find({ relations: ['lease'] });
  }

  async getPaymentById(id: number): Promise<Payment> {
    const payment = await this.paymentsRepository.findOne({
      where: { id },
      relations: ['lease'],
    });
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return payment;
  }

  async updatePaymentStatus(id: number, status: PaymentStatus): Promise<Payment> {
    const payment = await this.getPaymentById(id);
    payment.status = status;
    if (status === PaymentStatus.COMPLETED) {
      payment.paidAt = new Date();
    }
    return this.paymentsRepository.save(payment);
  }

  async deletePayment(id: number): Promise<void> {
    const result = await this.paymentsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
  }
}
