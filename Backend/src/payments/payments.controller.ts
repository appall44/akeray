import { Controller, Get, Post, Param, Body, Patch, Delete } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Payment, PaymentStatus } from './payment.entity';

class CreatePaymentDto {
  leaseId: number;
  amount: number;
}

class UpdatePaymentStatusDto {
  status: PaymentStatus;
}

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  // @Post()
  // async createPayment(@Body() dto: CreatePaymentDto): Promise<Payment> {
  
  //   const lease = { id: dto.leaseId } as any; 
  //   return this.paymentsService.createPayment(lease, dto.amount);
  // }

  @Get()
  async getAllPayments(): Promise<Payment[]> {
    return this.paymentsService.getAllPayments();
  }

  @Get(':id')
  async getPaymentById(@Param('id') id: number): Promise<Payment> {
    return this.paymentsService.getPaymentById(id);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: number,
    @Body() dto: UpdatePaymentStatusDto,
  ): Promise<Payment> {
    return this.paymentsService.updatePaymentStatus(id, dto.status);
  }

  @Delete(':id')
  async deletePayment(@Param('id') id: number): Promise<void> {
    return this.paymentsService.deletePayment(id);
  }
}
