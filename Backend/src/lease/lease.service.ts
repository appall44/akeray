import { Injectable } from '@nestjs/common';
import { Lease } from './lease.entity';

@Injectable()
export class LeaseService {
  async getLeaseById(id: string): Promise<Lease | null> {
    const lease = await Lease.findOne({ where: { leaseId: id } });
    return lease || null;
  }
}
