import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { SalesService } from './sales.service';
import { Sale } from './sales.entity';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  // async create(@Body() body: any): Promise<Sale> {
  //   const { amount, notes, unitId, buyerId } = body;
  //   // You'll need to fetch the Unit and User by their IDs
  //   const unit = { id: unitId } as any;  // Replace with actual fetch
  //   const buyer = { id: buyerId } as any;
  //   return this.salesService.createSale(amount, notes, unit, buyer);
  // }

  @Get()
  async findAll(): Promise<Sale[]> {
    return this.salesService.getAllSales();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Sale> {
    return this.salesService.getSaleById(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.salesService.deleteSale(id);
  }
}
