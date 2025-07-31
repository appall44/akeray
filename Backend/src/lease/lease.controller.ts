import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { LeaseService } from './lease.service';

@Controller('api/lease')
export class LeaseController {
  constructor(private readonly leaseService: LeaseService) {}

  @Get(':id')
  async getLease(@Param('id') id: string) {
    const lease = await this.leaseService.getLeaseById(id);
    if (!lease) throw new NotFoundException('Lease not found');
    return lease;
  }
}
