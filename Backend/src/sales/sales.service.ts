import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './sales.entity';
import { Unit } from '../units/entities/unit.entity';
import { User } from '../iam/users/entities/user.entity';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private readonly salesRepository: Repository<Sale>,
  ) {}

  // async createSale(amount: number, notes: string, unit: Unit, buyer: User): Promise<Sale> {
  //   const sale = this.salesRepository.create({ amount, notes, unit, buyer });
  //   return this.salesRepository.save(sale);
  // }

  async getAllSales(): Promise<Sale[]> {
    return this.salesRepository.find({
      relations: ['unit', 'buyer'],
      order: { createdAt: 'DESC' },
    });
  }

  async getSaleById(id: number): Promise<Sale> {
    const sale = await this.salesRepository.findOne({
      where: { id },
      relations: ['unit', 'buyer'],
    });
    if (!sale) throw new NotFoundException('Sale not found');
    return sale;
  }

  async deleteSale(id: number): Promise<void> {
    await this.salesRepository.delete(id);
  }
}
